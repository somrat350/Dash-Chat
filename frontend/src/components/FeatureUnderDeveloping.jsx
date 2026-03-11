import { Link } from "react-router";

const FeatureUnderDeveloping = () => {
  return (
    <div class="flex items-center justify-center min-h-100 p-6">
      <div class="card w-full max-w-lg bg-base-100 shadow-2xl border border-primary/20 text-center py-12">
        <div class="card-body items-center">
          <div class="relative mb-4">
            <span class="loading loading-ring loading-lg text-primary scale-150"></span>
            <div class="absolute inset-0 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-secondary animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
          </div>

          <h2 class="text-3xl font-extrabold tracking-tight">
            Feature Under <span class="text-primary">Development</span>
          </h2>
          <p class="text-base-content/70 mt-2 max-w-xs">
            We are currently working hard to bring this feature to life. Stay
            tuned for something amazing!
          </p>

          <div class="w-full mt-6 space-y-2">
            <div class="flex justify-between text-xs font-semibold px-1">
              <span>Progress</span>
              <span>65%</span>
            </div>
            <progress
              class="progress progress-primary w-full"
              value="65"
              max="100"
            ></progress>
          </div>

          <div class="card-actions mt-8">
            <Link to="/dashboard/chats" class="btn btn-outline btn-sm gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Start Chats
            </Link>
            {/* <button class="btn btn-primary btn-sm">Notify Me</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureUnderDeveloping;
