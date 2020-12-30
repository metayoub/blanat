import { Moment } from 'moment';
import { ICommentHistory } from 'app/shared/model/comment-history.model';
import { IDealUser } from 'app/shared/model/deal-user.model';

export interface IDealComment {
  id?: number;
  comment?: string;
  dateComment?: Moment;
  isActive?: boolean;
  isDeleted?: boolean;
  like?: number;
  dislike?: number;
  dateLastModification?: Moment;
  dealHistories?: ICommentHistory[];
  dealCommentReply?: IDealComment[];
  assignedToId?: number;
  assignedTo?: IDealUser;
  parentId?: number;
  dealId?: number;
}

export class DealComment implements IDealComment {
  constructor(
    public id?: number,
    public comment?: string,
    public dateComment?: Moment,
    public isActive?: boolean,
    public isDeleted?: boolean,
    public like?: number,
    public dislike?: number,
    public dateLastModification?: Moment,
    public dealHistories?: ICommentHistory[],
    public dealCommentReply?: IDealComment[],
    public assignedToId?: number,
    public assignedTo?: IDealUser,
    public parentId?: number,
    public dealId?: number
  ) {
    this.isActive = this.isActive || false;
    this.isDeleted = this.isDeleted || false;
  }
}
