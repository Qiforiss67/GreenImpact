// Mock database untuk CRUD operations
let activities = [
  { id: 1, title: 'Plant a Tree', category: 'environment', difficulty: 'easy', points: 10, sdg: 13, description: 'Plant a tree in your community', userId: 'demo-user-123' },
  { id: 2, title: 'Reduce Water Usage', category: 'environment', difficulty: 'medium', points: 15, sdg: 6, description: 'Track and reduce daily water consumption', userId: 'demo-user-123' }
];

let nextId = 3;

export const mockDb = {
  // CREATE
  addActivity: async (activity) => {
    const newActivity = { ...activity, id: nextId++, userId: 'demo-user-123' };
    activities.push(newActivity);
    return newActivity;
  },
  
  // READ
  getActivities: async (userId = 'demo-user-123') => {
    return activities.filter(activity => activity.userId === userId);
  },
  
  // UPDATE
  updateActivity: async (id, updates) => {
    const index = activities.findIndex(activity => activity.id === id);
    if (index !== -1) {
      activities[index] = { ...activities[index], ...updates };
      return activities[index];
    }
    throw new Error('Activity not found');
  },
  
  // DELETE
  deleteActivity: async (id) => {
    const index = activities.findIndex(activity => activity.id === id);
    if (index !== -1) {
      const deleted = activities.splice(index, 1)[0];
      return deleted;
    }
    throw new Error('Activity not found');
  }
};