package com.aa.blanat.service.mapper;


import com.aa.blanat.domain.*;
import com.aa.blanat.service.dto.DealDTOList;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Deal} and its DTO {@link DealDTOList}.
 */
@Mapper(componentModel = "spring", uses = {DealLocationMapper.class, DealUserMapper.class, DealCategoryMapper.class,
    DealCommentMapper.class, DealHistoryMapper.class})
public interface DealListMapper extends EntityMapper<DealDTOList, Deal> {

    @Mapping(source = "dealLocation.id", target = "dealLocationId")
    // @Mapping(source = "assignedTo.id", target = "assignedToId")
    DealDTOList toDto(Deal deal);

    @Mapping(source = "dealLocationId", target = "dealLocation")
    // @Mapping(source = "assignedToId", target = "assignedTo")
    @Mapping(target = "removeDealCategory", ignore = true)
    @Mapping(target = "dealUsers", ignore = true)
    @Mapping(target = "removeDealUser", ignore = true)
    Deal toEntity(DealDTOList dealDTO);

    default Deal fromId(Long id) {
        if (id == null) {
            return null;
        }
        Deal deal = new Deal();
        deal.setId(id);
        return deal;
    }
}
