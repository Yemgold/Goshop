export interface Rider {
  id: string;
  name: string;
  isAvailable: boolean;

  distanceScore: number;
  activeJobs: number;
  rating: number;

  trafficMultiplier: number;
}

export const riders: Rider[] = [
  {
    id: "r1",
    name: "John",
    isAvailable: true,
    distanceScore: 2,
    activeJobs: 1,
    rating: 4.8,
    trafficMultiplier: 1.2,
  },
  {
    id: "r2",
    name: "Sarah",
    isAvailable: true,
    distanceScore: 5,
    activeJobs: 0,
    rating: 4.9,
    trafficMultiplier: 1.0,
  },
  {
    id: "r3",
    name: "Mike",
    isAvailable: true,
    distanceScore: 1,
    activeJobs: 3,
    rating: 4.5,
    trafficMultiplier: 1.5,
  },
  {
    id: "r4",
    name: "Ayo",
    isAvailable: false,
    distanceScore: 3,
    activeJobs: 1,
    rating: 4.7,
    trafficMultiplier: 1.3,
  },
];




// export interface Rider {
//   id: string;
//   name: string;
//   isAvailable: boolean;
//   locationScore: number; // fake distance score (lower = closer)
// }

// export const riders: Rider[] = [
//   { id: "r1", name: "John Rider", isAvailable: true, locationScore: 2 },
//   { id: "r2", name: "Sarah Rider", isAvailable: true, locationScore: 5 },
//   { id: "r3", name: "Mike Rider", isAvailable: false, locationScore: 1 },
//   { id: "r4", name: "Ayo Rider", isAvailable: true, locationScore: 3 },
// ];