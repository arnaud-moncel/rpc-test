/* eslint-disable */
import {
  CollectionCustomizer,
  TAggregation,
  TConditionTree,
  TPaginatedFilter,
  TPartialRow,
  TSortClause
} from '@forestadmin/agent';

export type UserCustomizer = CollectionCustomizer<Schema, 'user'>;
export type UserRecord = TPartialRow<Schema, 'user'>;
export type UserConditionTree = TConditionTree<Schema, 'user'>;
export type UserFilter = TPaginatedFilter<Schema, 'user'>;
export type UserSortClause = TSortClause<Schema, 'user'>;
export type UserAggregation = TAggregation<Schema, 'user'>;

export type GroupCustomizer = CollectionCustomizer<Schema, 'group'>;
export type GroupRecord = TPartialRow<Schema, 'group'>;
export type GroupConditionTree = TConditionTree<Schema, 'group'>;
export type GroupFilter = TPaginatedFilter<Schema, 'group'>;
export type GroupSortClause = TSortClause<Schema, 'group'>;
export type GroupAggregation = TAggregation<Schema, 'group'>;


export type Schema = {
  'group': {
    plain: {
      'id': number;
      'name': string | null;
    };
    nested: {};
    flat: {};
  };
  'user': {
    plain: {
      'group_id': number | null;
      'id': number;
      'name': string | null;
      'toto': string | null;
    };
    nested: {
      'group': Schema['group']['plain'] & Schema['group']['nested'];
    };
    flat: {
      'group:id': number;
      'group:name': string | null;
    };
  };
};
