package com.aa.blanat.web.rest;

import com.aa.blanat.domain.Authority;
import com.aa.blanat.domain.User;
import com.aa.blanat.repository.UserRepository;
import com.aa.blanat.security.AuthoritiesConstants;
import com.aa.blanat.service.DealUserService;
import com.aa.blanat.service.MailService;
import com.aa.blanat.service.UserService;
import com.aa.blanat.web.rest.errors.BadRequestAlertException;
import com.aa.blanat.web.rest.errors.DealUserDeletedException;
import com.aa.blanat.web.rest.errors.LoginAlreadyUsedException;
import com.aa.blanat.web.rest.errors.EmailAlreadyUsedException;
import com.aa.blanat.service.dto.DealUserDTO;
import com.aa.blanat.service.dto.UserDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * REST controller for managing {@link com.aa.blanat.domain.DealUser}.
 */
@RestController
@RequestMapping("/api")
public class DealUserResource {

    private final Logger log = LoggerFactory.getLogger(DealUserResource.class);

    private static final String ENTITY_NAME = "dealUser";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;
    
    private final UserService userService;

    private final UserRepository userRepository;

    private final MailService mailService;

    private final DealUserService dealUserService;

    public DealUserResource(DealUserService dealUserService, UserService userService, UserRepository userRepository,
            MailService mailService) {
        this.dealUserService = dealUserService;
        this.userService = userService;
        this.userRepository = userRepository;
        this.mailService = mailService;
    }

    /**
     * {@code POST  /deal-users} : Create a new dealUser.
     *
     * @param dealUserDTO the dealUserDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dealUserDTO, or with status {@code 400 (Bad Request)} if the dealUser has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/deal-users")
    public ResponseEntity<DealUserDTO> createDealUser(@Valid @RequestBody DealUserDTO dealUserDTO) throws URISyntaxException {
        UserDTO userDTO = dealUserDTO.getUser();
        log.debug("REST request to save User : {}", dealUserDTO);
        if (userDTO.getId() != null || dealUserDTO.getId() != null) {
            throw new BadRequestAlertException("A new user (or dealUser) cannot already have an ID", ENTITY_NAME, "idexists");
            // Lowercase the user login before comparing with database
        } else if (userRepository.findOneByLogin(userDTO.getLogin().toLowerCase()).isPresent()) {
            throw new LoginAlreadyUsedException();
        } else if (userRepository.findOneByEmailIgnoreCase(userDTO.getEmail()).isPresent()) {
            throw new EmailAlreadyUsedException();
        } else {
            if (userDTO.getAuthorities() == null){
                HashSet<String> lstAuthorities = new HashSet<String>();
                lstAuthorities.add(AuthoritiesConstants.USER);
                userDTO.setAuthorities(lstAuthorities);             
            }
            User newUser = userService.createUser(userDTO);
            mailService.sendCreationEmail(newUser);
            dealUserDTO.setUserId(newUser.getId());
            log.debug("REST request to save DealUser : {}", dealUserDTO);
            if (Objects.isNull(dealUserDTO.getUserId())) {
                throw new BadRequestAlertException("Invalid association value provided", ENTITY_NAME, "null");
            }
            DealUserDTO result = dealUserService.save(dealUserDTO);
            return ResponseEntity
                    .created(new URI("/api/deal-users/" + result.getId())).headers(HeaderUtil
                            .createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                    .body(result);
        }
        /*if (dealUserDTO.getId() != null) {
            throw new BadRequestAlertException("A new dealUser cannot already have an ID", ENTITY_NAME, "idexists");
        }*/
    }

    /**
     * {@code PUT  /deal-users} : Updates an existing dealUser.
     *
     * @param dealUserDTO the dealUserDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dealUserDTO,
     * or with status {@code 400 (Bad Request)} if the dealUserDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dealUserDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/deal-users")
    public ResponseEntity<DealUserDTO> updateDealUser(@Valid @RequestBody DealUserDTO dealUserDTO) throws URISyntaxException {
        log.debug("REST request to update User : {}", dealUserDTO);
        if (dealUserDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserDTO userDTO = dealUserDTO.getUser();
        userDTO.setId(dealUserDTO.getId());
        Optional<User> existingUser = userRepository.findOneByEmailIgnoreCase(userDTO.getEmail());
        if (dealUserService.findOne(dealUserDTO.getId()).get().isDeleted()) {
            throw new DealUserDeletedException();
        }
        if (existingUser.isPresent() && (!existingUser.get().getId().equals(userDTO.getId()))) {
            throw new EmailAlreadyUsedException();
        }
        existingUser = userRepository.findOneByLogin(userDTO.getLogin().toLowerCase());
        if (existingUser.isPresent() && (!existingUser.get().getId().equals(userDTO.getId()))) {
            throw new LoginAlreadyUsedException();
        }
        Optional<UserDTO> updatedUser = userService.updateUser(userDTO);
        DealUserDTO result = dealUserService.save(dealUserDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, dealUserDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /deal-users} : get all the dealUsers.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dealUsers in body.
     */
    @GetMapping("/deal-users")
    public ResponseEntity<List<DealUserDTO>> getAllDealUsers(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of DealUsers");
        Page<DealUserDTO> page;
        if (eagerload) {
            page = dealUserService.findAllWithEagerRelationships(pageable);
        } else {
            page = dealUserService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /deal-users/:id} : get the "id" dealUser.
     *
     * @param id the id of the dealUserDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dealUserDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/deal-users/{id}")
    public ResponseEntity<DealUserDTO> getDealUser(@PathVariable Long id) {
        log.debug("REST request to get DealUser : {}", id);
        Optional<DealUserDTO> dealUserDTO = dealUserService.findOne(id);
        return ResponseUtil.wrapOrNotFound(dealUserDTO);
    }

    /**
     * {@code DELETE  /deal-users/:id} : delete the "id" dealUser.
     *
     * @param id the id of the dealUserDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/deal-users/{id}")
    public ResponseEntity<Void> deleteDealUser(@PathVariable Long id) {
        log.debug("REST request to delete DealUser : {}", id);

        userService.deleteByStatus(id);
        dealUserService.deleteByStatus(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
