import { GraphQLClient } from "graphql-request";

export function getGraphQLClient(): GraphQLClient | null {
  const endpoint = process.env.WORDPRESS_GRAPHQL_ENDPOINT;
  if (!endpoint) return null;
  return new GraphQLClient(endpoint);
}

export function hasWordPressEndpoint(): boolean {
  return Boolean(process.env.WORDPRESS_GRAPHQL_ENDPOINT);
}

export async function requestWordPress<T>(
  client: GraphQLClient,
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  return client.request<T>(query, variables);
}
