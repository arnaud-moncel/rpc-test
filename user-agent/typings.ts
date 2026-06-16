/* eslint-disable */
import {
  CollectionCustomizer,
  TAggregation,
  TConditionTree,
  TPaginatedFilter,
  TPartialRow,
  TSortClause
} from '@forestadmin/agent';

export type AddressCustomizer = CollectionCustomizer<Schema, 'address'>;
export type AddressRecord = TPartialRow<Schema, 'address'>;
export type AddressConditionTree = TConditionTree<Schema, 'address'>;
export type AddressFilter = TPaginatedFilter<Schema, 'address'>;
export type AddressSortClause = TSortClause<Schema, 'address'>;
export type AddressAggregation = TAggregation<Schema, 'address'>;

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
  'address': {
    plain: {
      'id': number;
      'line 1': string | null;
    };
    nested: {};
    flat: {};
  };
  'group': {
    plain: {
      'created_at': string | null;
      'id': number;
      'name': string | null;
    };
    nested: {};
    flat: {};
  };
  'user': {
    plain: {
      'adress_id': number | null;
      'group_id': number | null;
      'id': number;
      'name': string | null;
      'SFDepedingOnRPC': string | null;
    };
    nested: {
      'adress': Schema['address']['plain'] & Schema['address']['nested'];
      'group': Schema['group']['plain'] & Schema['group']['nested'];
    };
    flat: {
      'adress:id': number;
      'adress:line 1': string | null;
      'group:created_at': string | null;
      'group:id': number;
      'group:name': string | null;
    };
  };
};
