/* eslint-disable */
import {
  CollectionCustomizer,
  TAggregation,
  TConditionTree,
  TPaginatedFilter,
  TPartialRow,
  TSortClause
} from '@forestadmin/agent';

export type GroupCustomizer = CollectionCustomizer<Schema, 'group'>;
export type GroupRecord = TPartialRow<Schema, 'group'>;
export type GroupConditionTree = TConditionTree<Schema, 'group'>;
export type GroupFilter = TPaginatedFilter<Schema, 'group'>;
export type GroupSortClause = TSortClause<Schema, 'group'>;
export type GroupAggregation = TAggregation<Schema, 'group'>;


export type Schema = {
  'group': {
    plain: {
      'created_at': string | null;
      'id': number;
      'name': string | null;
    };
    nested: {};
    flat: {};
  };
};
