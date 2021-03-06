import { element, by, ElementFinder } from 'protractor';

export class CommentHistoryComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-comment-history div table .btn-danger'));
  title = element.all(by.css('jhi-comment-history div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class CommentHistoryUpdatePage {
  pageTitle = element(by.id('jhi-comment-history-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  commentInput = element(by.id('field_comment'));
  dateModificationInput = element(by.id('field_dateModification'));

  dealCommentSelect = element(by.id('field_dealComment'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCommentInput(comment: string): Promise<void> {
    await this.commentInput.sendKeys(comment);
  }

  async getCommentInput(): Promise<string> {
    return await this.commentInput.getAttribute('value');
  }

  async setDateModificationInput(dateModification: string): Promise<void> {
    await this.dateModificationInput.sendKeys(dateModification);
  }

  async getDateModificationInput(): Promise<string> {
    return await this.dateModificationInput.getAttribute('value');
  }

  async dealCommentSelectLastOption(): Promise<void> {
    await this.dealCommentSelect.all(by.tagName('option')).last().click();
  }

  async dealCommentSelectOption(option: string): Promise<void> {
    await this.dealCommentSelect.sendKeys(option);
  }

  getDealCommentSelect(): ElementFinder {
    return this.dealCommentSelect;
  }

  async getDealCommentSelectedOption(): Promise<string> {
    return await this.dealCommentSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class CommentHistoryDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-commentHistory-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-commentHistory'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
