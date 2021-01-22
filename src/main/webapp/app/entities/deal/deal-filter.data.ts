export const fields: any[] = [
  { label: 'title', name: 'title', type: 'text', initValue: 'title' },
  { label: 'type', name: 'type', type: 'select', enum: ['DEAL', 'COUPON'], initValue: 'DEAL' },
  {
    label: 'like',
    name: 'like',
    type: 'num',
    isMin: true,
    nameMin: 'likeMin',
    initValueMin: 0,
    isMax: true,
    nameMax: 'likeMax',
    initValueMax: 100,
  },
  {
    label: 'dislike',
    name: 'dislike',
    type: 'num',
    isMin: true,
    nameMin: 'dislikeMin',
    initValueMin: 0,
    isMax: true,
    nameMax: 'dislikeMax',
    initValueMax: 100,
  },
  {
    label: 'show',
    name: 'show',
    type: 'num',
    isMin: true,
    nameMin: 'showMin',
    initValueMin: 0,
    isMax: true,
    nameMax: 'showMax',
    initValueMax: 100,
  },
  { label: 'statut', name: 'statut', type: 'select', enum: ['ACTIVE', 'HIDDEN', 'EXPIRED', 'PENDING'], initValue: '' },
  { label: 'isDeleted', name: 'isDeleted', type: 'checkbox', isSelected: false },
  { label: 'isBlocked', name: 'isBlocked', type: 'checkbox', isSelected: true },
  {
    label: 'dateStart',
    name: 'dateStart',
    type: 'date',
    isMin: true,
    nameMin: 'dateStartMin',
    initValueMin: '',
    isMax: true,
    nameMax: 'dateStartMax',
    initValueMax: '',
  },
  {
    label: 'dateEnd',
    name: 'dateEnd',
    type: 'date',
    isMin: true,
    nameMin: 'dateEndMin',
    initValueMin: '',
    isMax: true,
    nameMax: 'dateEndMax',
    initValueMax: '',
  },
  {
    label: 'datePublication',
    name: 'datePublication',
    type: 'date',
    isMin: true,
    nameMin: 'datePublicationMin',
    initValueMin: '',
    isMax: true,
    nameMax: 'datePublicationMax',
    initValueMax: '',
  },
  // { name: 'dealCategories', title: 'dealCategories', type: 'list' },
];
