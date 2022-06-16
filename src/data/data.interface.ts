export interface ILaucnhData {
  launchDate: string;
  launchDateSet?: boolean;
  launchWindow?: string;
  launchSite?: string;
  missionName?: string;
  missionDescription?: string;
  rocket?: string;
  imageUrl?: string;
}

// interface Update {
//   launch: {
//     dateSet: boolean;
//     date: string;
//     window: string;
//   };
//   site?: {
//     id?: number;
//     country?: string;
//     location: string;
//     siteName?: string;
//     coordinates?: string;
//   };
//   mission: {
//     name: string;
//     description: string;
//     href?: string;
//     payload?: string;
//     provider?: string;
//   };
//   rocket?: string;
//   image?: {
//     url: string;
//   };
// }
