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

// Get top 5 trending movies ordered by count (highest first)
export const getTrendingMovies = async () => {
    const { data, error } = await supabase
        .from("mertics")
        .select("*")
        .order("count", { ascending: false })
        .limit(5);

    if (error) {
        console.error("Supabase getTrendingMovies error:", error);
    } else {
        console.log("Trending movies:", data);
    }

    return { data, error };
};

// Update search count — call this when a user searches for a movie
// If the searchTerm already exists, increment count by 1. Otherwise insert a new row.
export const updateSearchCount = async (searchTerm, movie) => {
    if (!searchTerm || !movie) return;

    // Check if a row with this searchTerm already exists (take first if multiple)
    const { data: rows, error: fetchError } = await supabase
        .from("mertics")
        .select("id, count")
        .eq("searchTerm", searchTerm)
        .order("created_at", { ascending: true })
        .limit(1);

    if (fetchError) {
        console.error("Supabase fetch error:", fetchError);
        return { data: null, error: fetchError };
    }

    const existing = rows && rows.length > 0 ? rows[0] : null;

    let data, error;

    if (existing) {
        // Row exists — increment count
        ({ data, error } = await supabase
            .from("mertics")
            .update({ count: existing.count + 1 })
            .eq("id", existing.id));
    } else {
        // No existing row — insert new one
        ({ data, error } = await supabase.from("mertics").insert([
            {
                searchTerm: searchTerm,
                count: 1,
                poster_url: movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : null,
                movie_id: movie.id,
            },
        ]));
    }

    if (error) {
        console.error("Supabase updateSearchCount error:", error);
    } else {
        console.log("Search count updated:", data);
    }

    return { data, error };
};
