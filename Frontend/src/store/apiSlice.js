import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Factory for standard CRUD endpoints
const createCRUDEndpoints = (builder, path, tag) => ({
  [`get${tag}s`]: builder.query({
    query: () => `/${path}`,
    providesTags: [tag],
  }),
  [`get${tag}`]: builder.query({
    query: (id) => `/${path}/${id}`,
    providesTags: (result, error, id) => [{ type: tag, id }],
  }),
  [`create${tag}`]: builder.mutation({
    query: (data) => ({
      url: `/${path}`,
      method: 'POST',
      body: data,
    }),
    invalidatesTags: [tag],
  }),
  [`update${tag}`]: builder.mutation({
    query: ({ id, ...patch }) => ({
      url: `/${path}/${id}`,
      method: 'PUT',
      body: patch,
    }),
    invalidatesTags: (result, error, { id }) => [{ type: tag, id }, tag],
  }),
  [`delete${tag}`]: builder.mutation({
    query: (id) => ({
      url: `/${path}/${id}`,
      method: 'DELETE',
    }),
    invalidatesTags: [tag],
  }),
});

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_URL + '/api', // Update if production
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Unauthorized - token is expired or invalid from another localhost app
    localStorage.removeItem('token');
    if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
      window.location.href = '/admin/login';
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Blog', 'Category', 'User', 'Project', 'Skill', 'Experience', 'Education', 'Service', 'Achievement', 'Setting', 'Message'],
  endpoints: (builder) => ({
    // Blogs
    getBlogs: builder.query({ query: () => '/blogs', providesTags: ['Blog'] }),
    getAdminBlogs: builder.query({ query: () => '/blogs/admin', providesTags: ['Blog'] }),
    getBlogBySlug: builder.query({ query: (slug) => `/blogs/${slug}`, providesTags: (result, error, slug) => [{ type: 'Blog', id: slug }] }),
    createBlog: builder.mutation({ query: (data) => ({ url: '/blogs', method: 'POST', body: data }), invalidatesTags: ['Blog'] }),
    updateBlog: builder.mutation({ query: ({ id, ...patch }) => ({ url: `/blogs/${id}`, method: 'PUT', body: patch }), invalidatesTags: (result, error, { id }) => [{ type: 'Blog', id }, 'Blog'] }),
    deleteBlog: builder.mutation({ query: (id) => ({ url: `/blogs/${id}`, method: 'DELETE' }), invalidatesTags: ['Blog'] }),

    // Categories
    getCategories: builder.query({ query: () => '/categories', providesTags: ['Category'] }),
    createCategory: builder.mutation({ query: (data) => ({ url: '/categories', method: 'POST', body: data }), invalidatesTags: ['Category'] }),
    deleteCategory: builder.mutation({ query: (id) => ({ url: `/categories/${id}`, method: 'DELETE' }), invalidatesTags: ['Category'] }),

    // Auth
    login: builder.mutation({ query: (credentials) => ({ url: '/auth/login', method: 'POST', body: credentials }) }),
    updateCredentials: builder.mutation({ query: (data) => ({ url: '/auth/credentials', method: 'PUT', body: data }) }),

    // Settings
    getSettings: builder.query({ query: () => '/settings', providesTags: ['Setting'] }),
    updateSettings: builder.mutation({ query: (data) => ({ url: '/settings', method: 'PUT', body: data }), invalidatesTags: ['Setting'] }),

    // Portfolio Modules (Using Factory)
    ...createCRUDEndpoints(builder, 'projects', 'Project'),
    ...createCRUDEndpoints(builder, 'portfolio/skills', 'Skill'),
    ...createCRUDEndpoints(builder, 'portfolio/experiences', 'Experience'),
    ...createCRUDEndpoints(builder, 'portfolio/educations', 'Education'),
    ...createCRUDEndpoints(builder, 'portfolio/services', 'Service'),
    ...createCRUDEndpoints(builder, 'portfolio/achievements', 'Achievement'),

    // Messages
    getMessages: builder.query({ query: () => '/messages', providesTags: ['Message'] }),
    createMessage: builder.mutation({ query: (data) => ({ url: '/messages', method: 'POST', body: data }), invalidatesTags: ['Message'] }),
    deleteMessage: builder.mutation({ query: (id) => ({ url: `/messages/${id}`, method: 'DELETE' }), invalidatesTags: ['Message'] }),
    markMessageAsRead: builder.mutation({ query: (id) => ({ url: `/messages/${id}/read`, method: 'PUT' }), invalidatesTags: ['Message'] }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetAdminBlogsQuery,
  useGetBlogBySlugQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useLoginMutation,
  useUpdateCredentialsMutation,

  useGetSettingsQuery,
  useUpdateSettingsMutation,

  // Projects
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,

  // Skills
  useGetSkillsQuery,
  useGetSkillQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,

  // Experiences
  useGetExperiencesQuery,
  useGetExperienceQuery,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,

  // Educations
  useGetEducationsQuery,
  useGetEducationQuery,
  useCreateEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,

  // Services
  useGetServicesQuery,
  useGetServiceQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,

  // Achievements
  useGetAchievementsQuery,
  useGetAchievementQuery,
  useCreateAchievementMutation,
  useUpdateAchievementMutation,
  useDeleteAchievementMutation,

  // Messages
  useGetMessagesQuery,
  useCreateMessageMutation,
  useDeleteMessageMutation,
  useMarkMessageAsReadMutation,
} = apiSlice;
