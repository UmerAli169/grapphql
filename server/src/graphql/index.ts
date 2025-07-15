import { mergeTypeDefs } from '@graphql-tools/merge';
import { mergeResolvers } from '@graphql-tools/merge';
import { productTypeDefs } from './typeDefs/product.typeDefs';
import { productResolvers } from './reslovers/Product.resolvers';
import { userTypeDefs } from './typeDefs/user.typeDefs';
import { userResolvers } from './reslovers/User.resolver';

export const typeDefs = mergeTypeDefs([productTypeDefs, userTypeDefs]);
export const resolvers = mergeResolvers([productResolvers, userResolvers]);

