import { mergeTypeDefs } from '@graphql-tools/merge';
import { mergeResolvers } from '@graphql-tools/merge';
import { productTypeDefs } from './typeDefs/product.typeDefs';
import { productResolvers } from './reslovers/Product.resolvers';
import { userTypeDefs } from './typeDefs/user.typeDefs';
import { userResolvers } from './reslovers/User.resolver';
import { reviewsTypeDefs } from './typeDefs/reviews.typeDefs';
import { reviewResolvers } from './reslovers/reviews.resolvers';
import { cartTypeDefs } from './typeDefs/cartItems.typeDefs';
import { cartResolvers } from './reslovers/cartItems.resolvers';
export const typeDefs = mergeTypeDefs([productTypeDefs, userTypeDefs, reviewsTypeDefs, cartTypeDefs]);
export const resolvers = mergeResolvers([productResolvers, userResolvers, reviewResolvers, cartResolvers]);

    