import { apiClient } from './client';
import { mockServer } from './mockServer';
import type { 
  Project, 
  ProjectsResponse, 
  CreateProjectDto, 
  UpdateProjectDto 
} from '../types/project';

const USE_MOCK_API = true;

export const projectsApi = {
  getProjects: async (): Promise<ProjectsResponse> => {
    if (USE_MOCK_API) {
      const projects = await mockServer.getProjects();
      return { projects, total: projects.length };
    }
    return apiClient.get<ProjectsResponse>('/projects');
  },

  getProject: async (id: string): Promise<Project> => {
    if (USE_MOCK_API) {
      const project = await mockServer.getProject(id);
      if (!project) throw new Error('Project not found');
      return project;
    }
    return apiClient.get<Project>(`/projects/${id}`);
  },

  createProject: async (data: CreateProjectDto): Promise<Project> => {
    if (USE_MOCK_API) return mockServer.createProject({ ...data, status: 'active' });
    return apiClient.post<Project>('/projects', data);
  },

  updateProject: async (id: string, data: UpdateProjectDto): Promise<Project> => {
    if (USE_MOCK_API) return mockServer.updateProject(id, data);
    return apiClient.put<Project>(`/projects/${id}`, data);
  },

  deleteProject: async (id: string): Promise<void> => {
    if (USE_MOCK_API) return mockServer.deleteProject(id);
    return apiClient.delete<void>(`/projects/${id}`);
  },
};