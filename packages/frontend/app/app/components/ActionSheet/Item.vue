<template>
  <li class="px-5 hover:bg-gray-100 cursor-pointer">
    <div class="flex items-center font-medium py-4 border-b border-gray-100">
      <div class="mr-3">
        <slot name="prepend" />
      </div>
      <slot />
    </div>
  </li>
</template>
