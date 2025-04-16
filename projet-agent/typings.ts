/* eslint-disable */
import {
  CollectionCustomizer,
  TAggregation,
  TConditionTree,
  TPaginatedFilter,
  TPartialRow,
  TSortClause
} from '@forestadmin/agent';

export type ProjectCustomizer = CollectionCustomizer<Schema, 'project'>;
export type ProjectRecord = TPartialRow<Schema, 'project'>;
export type ProjectConditionTree = TConditionTree<Schema, 'project'>;
export type ProjectFilter = TPaginatedFilter<Schema, 'project'>;
export type ProjectSortClause = TSortClause<Schema, 'project'>;
export type ProjectAggregation = TAggregation<Schema, 'project'>;

export type GroupCustomizer = CollectionCustomizer<Schema, 'group'>;
export type GroupRecord = TPartialRow<Schema, 'group'>;
export type GroupConditionTree = TConditionTree<Schema, 'group'>;
export type GroupFilter = TPaginatedFilter<Schema, 'group'>;
export type GroupSortClause = TSortClause<Schema, 'group'>;
export type GroupAggregation = TAggregation<Schema, 'group'>;

export type UserCustomizer = CollectionCustomizer<Schema, 'user'>;
export type UserRecord = TPartialRow<Schema, 'user'>;
export type UserConditionTree = TConditionTree<Schema, 'user'>;
export type UserFilter = TPaginatedFilter<Schema, 'user'>;
export type UserSortClause = TSortClause<Schema, 'user'>;
export type UserAggregation = TAggregation<Schema, 'user'>;


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
  'project': {
    plain: {
      'group_id': number | null;
      'id': number;
      'name': string | null;
      'owner_id': number | null;
    };
    nested: {
      'group': Schema['group']['plain'] & Schema['group']['nested'];
      'owner': Schema['user']['plain'] & Schema['user']['nested'];
    };
    flat: {
      'group:created_at': string | null;
      'group:id': number;
      'group:name': string | null;
      'owner:group_id': number | null;
      'owner:id': number;
      'owner:name': string | null;
      'owner:toto': string | null;
      'owner:group:created_at': string | null;
      'owner:group:id': number;
      'owner:group:name': string | null;
    };
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
      'group:created_at': string | null;
      'group:id': number;
      'group:name': string | null;
    };
  };
};
