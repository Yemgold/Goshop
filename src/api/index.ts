import { apiClient } from "./core/api.client";

import { setupMockAdapter } from "./mock/mock.api"; 

const USE_MOCKS = true;

if (USE_MOCKS) {
  setupMockAdapter(apiClient);
}

export default apiClient;