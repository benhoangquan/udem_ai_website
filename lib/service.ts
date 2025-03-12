import { fetchAPI } from "./base";

export async function getPosts(first = 10) {
    const data = await fetchAPI(
        `query FetchPosts($first: Int = 10) {
        posts(first: $first) {
          nodes {
            excerpt
            featuredImage {
              node {
                sourceUrl
              }
            }
            slug
            title
          }
        }
      }`,
        {
            variables: {
                first,
            },
        }
    );

    return data?.posts?.nodes;
}

export async function getEvents() {
    const data = await fetchAPI(
    `query GetEvents {
      events {
        nodes {
          eventDetails {
            eventDateTime
            eventType {
              nodes {
                taxonomyName
                ... on Category {
                  id
                  name
                }
              }
            }
            registrationLink
            speakersguests {
              nodes {
                ... on Person {
                  id
                  title
                }
              }
            }
            location {
              city
              countryShort
              country
              latitude
              longitude
              placeId
              postCode
              state
              stateShort
              streetAddress
              streetName
              streetNumber
              zoom
            }
            description
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
          title
          }
        }
      }`
    );
    return data?.events?.nodes;
}

export async function getActivities() {
    const data = await fetchAPI(
    `query GetActivities {
      activities {
        nodes {
          title
          featuredImage {
            node {
              sourceUrl
            }
          }
          activitiesDetails {
            activityDate
            activityType {
              nodes {
                name
              }
            }
            description
            location
            photoGallery
            recurrence
          }
        }
      }
    }`
    );
    return data?.activities?.nodes;
}