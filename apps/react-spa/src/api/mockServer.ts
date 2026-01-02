import type { Project } from '../types/project';
import type { Task, CreateTaskDTO, UpdateTaskDTO, TaskStatus } from '../types/task';

// Simulated network delay
const delay = () => new Promise(resolve => setTimeout(resolve, 800));

// Mock database - Projects
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete overhaul of company website with modern design',
    status: 'active',
    createdAt: new Date('2026-01-01').toISOString(),
    updatedAt: new Date('2026-01-01').toISOString(),
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Native mobile app for iOS and Android',
    status: 'active',
    createdAt: new Date('2025-12-15').toISOString(),
    updatedAt: new Date('2025-12-20').toISOString(),
  },
  {
    id: '3',
    name: 'Marketing Campaign Q1',
    description: 'First quarter marketing initiatives',
    status: 'active',
    createdAt: new Date('2025-12-01').toISOString(),
    updatedAt: new Date('2025-12-01').toISOString(),
  },
];

// Mock database - Tasks
const mockTasks: Task[] = [];
let taskIdCounter = 1;

// Helper: Generate task ID
const generateTaskId = () => `task-${taskIdCounter++}`;

// Helper: Find task by ID
const findTask = (id: string) => mockTasks.find(t => t.id === id);

// Helper: Get tasks by project ID
const getProjectTasks = (projectId: string) => 
  mockTasks.filter(t => t.projectId === projectId);

// Seed some initial tasks
const seedTasks = () => {
  if (mockProjects.length > 0) {
    const projectId = mockProjects[0].id;
    mockTasks.push(
      {
        id: generateTaskId(),
        projectId,
        title: 'Design homepage mockup',
        description: 'Create initial design concepts for the new homepage',
        status: 'done',
        priority: 'high',
        createdAt: new Date('2026-01-01T10:00:00').toISOString(),
        updatedAt: new Date('2026-01-01T15:00:00').toISOString(),
      },
      {
        id: generateTaskId(),
        projectId,
        title: 'Implement authentication system',
        description: 'Add login and registration functionality',
        status: 'doing',
        priority: 'high',
        createdAt: new Date('2026-01-01T11:00:00').toISOString(),
        updatedAt: new Date('2026-01-02T09:00:00').toISOString(),
      },
      {
        id: generateTaskId(),
        projectId,
        title: 'Write API documentation',
        description: 'Document all REST API endpoints',
        status: 'todo',
        priority: 'medium',
        createdAt: new Date('2026-01-01T12:00:00').toISOString(),
        updatedAt: new Date('2026-01-01T12:00:00').toISOString(),
      },
      {
        id: generateTaskId(),
        projectId,
        title: 'Setup CI/CD pipeline',
        description: 'Configure automated testing and deployment',
        status: 'todo',
        priority: 'low',
        createdAt: new Date('2026-01-01T13:00:00').toISOString(),
        updatedAt: new Date('2026-01-01T13:00:00').toISOString(),
      }
    );
  }
};

// Initialize seed data
seedTasks();

export const mockServer = {
  // Project endpoints
  getProjects: async (): Promise<Project[]> => {
    await delay();
    return [...mockProjects];
  },

  getProject: async (id: string): Promise<Project | null> => {
    await delay();
    const project = mockProjects.find(p => p.id === id);
    return project || null;
  },

  createProject: async (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> => {
    await delay();
    const newProject: Project = {
      ...data,
      id: String(mockProjects.length + 1),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockProjects.push(newProject);
    return newProject;
  },

  updateProject: async (id: string, data: Partial<Project>): Promise<Project> => {
    await delay();
    const index = mockProjects.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Project not found');
    
    mockProjects[index] = {
      ...mockProjects[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return mockProjects[index];
  },

  deleteProject: async (id: string): Promise<void> => {
    await delay();
    const index = mockProjects.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Project not found');
    
    // Also delete all tasks for this project
    const taskIndices = mockTasks
      .map((t, i) => t.projectId === id ? i : -1)
      .filter(i => i !== -1)
      .reverse();
    taskIndices.forEach(i => mockTasks.splice(i, 1));
    
    mockProjects.splice(index, 1);
  },

  // Task endpoints
  getTasks: async (projectId: string): Promise<Task[]> => {
    await delay();
    return getProjectTasks(projectId);
  },

  getTask: async (id: string): Promise<Task | null> => {
    await delay();
    const task = findTask(id);
    return task || null;
  },

  createTask: async (data: CreateTaskDTO): Promise<Task> => {
    await delay();
    const newTask: Task = {
      id: generateTaskId(),
      projectId: data.projectId,
      title: data.title,
      description: data.description || '',
      status: data.status || 'todo',
      priority: data.priority || 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockTasks.push(newTask);
    return newTask;
  },

  updateTask: async (id: string, data: UpdateTaskDTO): Promise<Task> => {
    await delay();
    const task = findTask(id);
    if (!task) throw new Error('Task not found');
    
    Object.assign(task, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
    return task;
  },

  deleteTask: async (id: string): Promise<void> => {
    await delay();
    const index = mockTasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task not found');
    mockTasks.splice(index, 1);
  },

  updateTaskStatus: async (id: string, status: TaskStatus): Promise<Task> => {
    await delay();
    const task = findTask(id);
    if (!task) throw new Error('Task not found');
    
    task.status = status;
    task.updatedAt = new Date().toISOString();
    return task;
  },
};