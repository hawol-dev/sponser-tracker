import { vi } from "vitest";

// Mock Supabase query builder
export const createMockQueryBuilder = () => {
  const builder: any = {
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    neq: vi.fn().mockReturnThis(),
    gt: vi.fn().mockReturnThis(),
    gte: vi.fn().mockReturnThis(),
    lt: vi.fn().mockReturnThis(),
    lte: vi.fn().mockReturnThis(),
    like: vi.fn().mockReturnThis(),
    ilike: vi.fn().mockReturnThis(),
    is: vi.fn().mockReturnThis(),
    in: vi.fn().mockReturnThis(),
    not: vi.fn().mockReturnThis(),
    or: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    single: vi.fn().mockReturnThis(),
    maybeSingle: vi.fn().mockReturnThis(),
    // Default resolved value
    then: vi.fn((resolve) => resolve({ data: [], error: null })),
  };
  return builder;
};

// Mock Supabase client
export const createMockSupabaseClient = (mockUser: any = null) => {
  const queryBuilder = createMockQueryBuilder();

  return {
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: mockUser },
        error: null,
      }),
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      updateUser: vi.fn(),
    },
    from: vi.fn(() => queryBuilder),
    _queryBuilder: queryBuilder,
  };
};

// Default mock user for authenticated tests
export const mockUser = {
  id: "test-user-id",
  email: "test@example.com",
  user_metadata: {
    name: "Test User",
    onboarding_completed: true,
  },
};

// Helper to set query result
export const setQueryResult = (
  queryBuilder: any,
  data: any,
  error: any = null
) => {
  queryBuilder.then = vi.fn((resolve) => resolve({ data, error }));
  return queryBuilder;
};
