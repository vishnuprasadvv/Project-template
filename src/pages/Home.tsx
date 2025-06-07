import { Link } from 'react-router-dom';
import { useCounterStore } from '../store/counterStore';
import { Button } from '../components/ui/button'; // Ensure the path is correct
import { usePosts } from '@/hooks/usePosts';

export const Home = () => {
  const { count, increment, decrement, reset } = useCounterStore();
  const { data: posts, isLoading, isError, error } = usePosts();

  return (
    <div className="p-8 space-y-8 max-w-8xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">Welcome to the Company Web App!</h1>

      {/* Zustand Counter Example */}
      <section className="bg-gray-100 p-6 rounded-lg shadow-inner">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Zustand Counter Example</h2>
        <p className="text-xl text-center mb-4">Current Count: <span className="font-bold text-blue-600">{count}</span></p>
        <div className="flex justify-center gap-4">
          <Button onClick={increment} variant="default">Increment</Button>
          <Button onClick={decrement} variant="secondary">Decrement</Button>
          <Button onClick={reset} variant="outline">Reset</Button>
        </div>
      </section>

      {/* TanStack Query Example */}
      <section className="bg-gray-100 p-6 rounded-lg shadow-inner">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">TanStack Query (Posts Data)</h2>
        {isLoading && <p className="text-center text-blue-500">Loading posts...</p>}
        {isError && <p className="text-center text-red-500">Error fetching posts: {error?.message}</p>}
        {posts && (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.slice(0, 5).map((post) => ( // Display first 5 posts
              <li key={post.id} className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                <h3 className="font-semibold text-lg text-gray-800">{post.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{post.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Navigation */}
      <nav className="text-center mt-8">
        <Link to="/about" className="text-blue-600 hover:underline text-lg">Go to About Page</Link>
      </nav>
    </div>
  );
};
