
const Skeleton = () => {
  return (
    <div class="flex w-full animate-pulse flex-col justify-center gap-2 overflow-y-auto lg:flex-row lg:gap-5">
      <div class="flex items-center justify-center overflow-hidden">
        <div class="h-64 w-64 rounded-3xl bg-gray-200"></div>
      </div>
      <form class="flex flex-col gap-2 lg:gap-4">
        <div class="flex flex-col items-center gap-2 py-2 lg:items-start lg:gap-4">
          <div class="h-4 w-16 rounded bg-gray-200"></div>
          <div class="h-6 w-64 truncate whitespace-nowrap rounded bg-gray-200"></div>
        </div>
        <div class="flex max-w-full flex-col gap-2 lg:gap-4">
          <div class="h-10 w-full rounded bg-gray-200"></div>
          <div class="h-10 w-full rounded bg-gray-200"></div>
          <div class="h-10 w-full rounded bg-gray-200"></div>
          <div class="h-10 w-full rounded bg-gray-200"></div>
        </div>
        <div class="input-file input-file-secondary h-10 w-full rounded bg-gray-200"></div>
        <div class="h-10 w-20 rounded bg-gray-200"></div>
      </form>
    </div>
  );
};

export default Skeleton;
