import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  DealCategoryComponentsPage,
  DealCategoryDeleteDialog,
  DealCategoryUpdatePage,
  DealCategoryViewPage,
} from './deal-category.page-object';

const expect = chai.expect;

describe('DealCategory e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let dealCategoryComponentsPage: DealCategoryComponentsPage;
  let dealCategoryUpdatePage: DealCategoryUpdatePage;
  let dealCategoryDeleteDialog: DealCategoryDeleteDialog;
  let dealCategoryViewPage: DealCategoryViewPage;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load DealCategories', async () => {
    await navBarPage.goToEntity('deal-category');
    dealCategoryComponentsPage = new DealCategoryComponentsPage();
    await browser.wait(ec.visibilityOf(dealCategoryComponentsPage.title), 5000);
    expect(await dealCategoryComponentsPage.getTitle()).to.eq('blanatApp.dealCategory.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(dealCategoryComponentsPage.entities), ec.visibilityOf(dealCategoryComponentsPage.noResult)),
      1000
    );
  });

  it('should load DealCategory page and edit DealCategory page', async () => {
    await dealCategoryComponentsPage.clickOnEditButton();
    dealCategoryViewPage = new DealCategoryViewPage();
    expect(await dealCategoryViewPage.getPageTitle()).to.eq('blanatApp.dealCategory.detail.title');
    const name = await dealCategoryViewPage.getNameInput();
    const description = await dealCategoryViewPage.getDescriptionInput();

    await dealCategoryViewPage.clickOnEditButton();
    dealCategoryUpdatePage = new DealCategoryUpdatePage();
    expect(await dealCategoryUpdatePage.getNameInput()).to.eq(name);
    expect(await dealCategoryUpdatePage.getDescriptionInput()).to.eq(description);

    await dealCategoryUpdatePage.cancel();
    await dealCategoryViewPage.clickOnCancelButton();
  });

  it('should load create DealCategory page', async () => {
    await dealCategoryComponentsPage.clickOnCreateButton();
    dealCategoryUpdatePage = new DealCategoryUpdatePage();
    expect(await dealCategoryUpdatePage.getPageTitle()).to.eq('blanatApp.dealCategory.home.createOrEditLabel');
    await dealCategoryUpdatePage.cancel();
  });

  it('should create and save DealCategories', async () => {
    const nbButtonsBeforeCreate = await dealCategoryComponentsPage.countDeleteButtons();

    await dealCategoryComponentsPage.clickOnCreateButton();

    await promise.all([dealCategoryUpdatePage.setNameInput('name'), dealCategoryUpdatePage.setDescriptionInput('description')]);

    expect(await dealCategoryUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await dealCategoryUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );

    const selectedIsParent = dealCategoryUpdatePage.getIsParentInput();
    await selectedIsParent.click();
    await dealCategoryUpdatePage.getCategorySelect().isDisplayed();
    await dealCategoryUpdatePage.categorySelectLastOption(), await dealCategoryUpdatePage.save();
    expect(await dealCategoryUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await dealCategoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last DealCategory', async () => {
    const nbButtonsBeforeDelete = await dealCategoryComponentsPage.countDeleteButtons();
    await dealCategoryComponentsPage.clickOnLastDeleteButton();

    dealCategoryDeleteDialog = new DealCategoryDeleteDialog();
    expect(await dealCategoryDeleteDialog.getDialogTitle()).to.eq('blanatApp.dealCategory.delete.question');
    await dealCategoryDeleteDialog.clickOnConfirmButton();

    expect(await dealCategoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
