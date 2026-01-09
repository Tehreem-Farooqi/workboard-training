import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../authStore';

describe('authStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  });

  it('should initialize with null user', () => {
    const { user, isAuthenticated } = useAuthStore.getState();
    expect(user).toBeNull();
    expect(isAuthenticated).toBe(false);
  });

  it('should login user', async () => {
    const mockUser = { id: '1', email: 'test@example.com', name: 'Test User' };
    const mockToken = 'mock-token';

    // Mock the login by directly setting the state
    useAuthStore.getState().setUser(mockUser);
    useAuthStore.getState().setToken(mockToken);

    const { user, token, isAuthenticated } = useAuthStore.getState();
    expect(user).toEqual(mockUser);
    expect(token).toBe(mockToken);
    expect(isAuthenticated).toBe(true);
  });

  it('should logout user', () => {
    const mockUser = { id: '1', email: 'test@example.com', name: 'Test User' };
    useAuthStore.getState().setUser(mockUser);
    useAuthStore.getState().setToken('token');
    
    useAuthStore.getState().logout();

    const { user, token, isAuthenticated } = useAuthStore.getState();
    expect(user).toBeNull();
    expect(token).toBeNull();
    expect(isAuthenticated).toBe(false);
  });
});