<script lang="ts">
</script>

<main>
  <div>
    <div class="mb-2">
      <h1 class="text-lg font-bold">Good evening, John</h1>
      <p>You have to share a story in 30 minutes</p>
    </div>
  </div>
  <br />
  <div>
    <div class="mb-2">
      <h1 class="text-lg font-bold">Time State</h1>
      <p>Set a productive coding session</p>
    </div>
    <button
      class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >Enter Time State</button
    >
  </div>
  <br />
  <div>
    <div class="mb-2">
      <h1 class="text-lg font-bold">Your Scratchpads</h1>
      <p>Write your thoughts and implementations</p>
    </div>
    <textarea
      id="message"
      rows="4"
      class="block p-2.5 w-full text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
      placeholder="Write your thoughts here..."
    ></textarea>
  </div>
</main>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  * {
    font-family: "Inter", sans-serif;
  }
</style>
