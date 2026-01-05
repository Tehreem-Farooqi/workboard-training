import { apiClient } from './client';
import { mockServer } from './mockServer';
import type { 
  Project, 
  ProjectsResponse, 
  CreateProjectDto, 
  UpdateProjectDto 
} from '../types/project';
import type { ProjectFilters, PaginationParams } from '../utils/filterTypes';

const USE_MOCK_API = true;

export const projectsApi = {
  getProjects: async (
    filters?: ProjectFilters,
    pagination?: PaginationParams
  ): Promise<ProjectsResponse> => {
    if (USE_MOCK_API) {
      const projects = await mockServer.getProjects();
      
      // Apply filters
      let filtered = projects;
      if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(searchLower) ||
          p.description?.toLowerCase().includes(searchLower)
        );
      }
      if (filters?.status && filters.status !== 'all') {
        filtered = filtered.filter(p => p.status === filters.status);
      }

      // Apply pagination
      const total = filtered.length;
      const page = pagination?.page ?? 1;
      const pageSize = pagination?.pageSize ?? 10;
      const totalPages = Math.ceil(total / pageSize);
      const start = (page - 1) * pageSize;
      const paginated = filtered.slice(start, start + pageSize);

      return { 
        projects: paginated, 
        total, 
        page, 
        pageSize, 
        totalPages 
      };
    }
    // Real API would pass query params
    const params = new URLSearchParams();
    if (filters?.search) params.set('search', filters.search);
    if (filters?.status) params.set('status', filters.status);
    if (pagination?.page) params.set('page', String(pagination.page));
    if (pagination?.pageSize) params.set('pageSize', String(pagination.pageSize));
    
    return apiClient.get<ProjectsResponse>(`/projects?${params}`);
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