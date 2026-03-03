import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Insert a single dummy row into the "mertics" table to verify the connection
export const insertDummyMetric = async () => {
    const { data, error } = await supabase.from("mertics").insert([
        {
            searchTerm: "Batman",
            count: 1,
            poster_url: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
            movie_id: 268,
        },
    ]);

    if (error) {
        console.error("Supabase insert error:", error);
    } else {
        console.log("Dummy metric inserted successfully:", data);
    }

    return { data, error };
};

// Update search count — call this when a user searches for a movie
export const updateSearchCount = async (searchTerm, movie) => {
    if (!searchTerm || !movie) return;

    const { data, error } = await supabase.from("mertics").insert([
        {
            searchTerm: searchTerm,
            count: 1,
            poster_url: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : null,
            movie_id: movie.id,
        },
    ]);

    if (error) {
        console.error("Supabase updateSearchCount error:", error);
    } else {
        console.log("Search count updated:", data);
    }

    return { data, error };
};
