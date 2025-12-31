import { supabase } from './supabaseClient';

export const api = {
    // Movies
    getMovies: async (type = null) => {
        try {
            let query = supabase.from('movies').select('*').order('created_at', { ascending: false });

            if (type) {
                query = query.eq('type', type);
            }

            const { data, error } = await query;
            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    },

    addMovie: async (movie) => {
        try {
            // Ensure type is 'movie' if not specified
            const movieData = { ...movie, type: movie.type || 'movie' };
            const { data, error } = await supabase.from('movies').insert([movieData]).select();

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    },

    updateMovie: async (id, updates) => {
        try {
            const { error } = await supabase.from('movies').update(updates).eq('id', id);
            if (error) throw error;
            return { error: null };
        } catch (error) {
            return { error };
        }
    },

    deleteMovie: async (id) => {
        try {
            const { error } = await supabase.from('movies').delete().eq('id', id);
            if (error) throw error;
            return { error: null };
        } catch (error) {
            return { error };
        }
    },

    // Featured Movie
    getFeaturedMovie: async () => {
        try {
            const { data, error } = await supabase.from('featured_movie').select('*').limit(1);
            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    },

    updateFeaturedMovie: async (id, updates) => {
        try {
            const { error } = await supabase.from('featured_movie').update(updates).eq('id', id);
            if (error) throw error;
            return { error: null };
        } catch (error) {
            return { error };
        }
    },

    createFeaturedMovie: async (data) => {
        try {
            const { error } = await supabase.from('featured_movie').insert([data]);
            if (error) throw error;
            return { error: null };
        } catch (error) {
            return { error };
        }
    },

    // Visitor Stats
    incrementVisitor: async () => {
        try {
            // First get current value
            const { data: current, error: fetchError } = await supabase
                .from('site_stats')
                .select('value')
                .eq('key_name', 'total_visits')
                .single();

            if (fetchError) throw fetchError;

            // Increment
            const { error: updateError } = await supabase
                .from('site_stats')
                .update({ value: (current.value || 0) + 1 })
                .eq('key_name', 'total_visits');

            if (updateError) throw updateError;
            return { error: null };
        } catch (error) {
            console.error("Stats Error:", error);
            // Non-blocking error
            return { error };
        }
    },

    getVisitorCount: async () => {
        try {
            const { data, error } = await supabase
                .from('site_stats')
                .select('value')
                .eq('key_name', 'total_visits')
                .single();

            if (error) throw error;
            return { count: data.value, error: null };
        } catch (error) {
            return { count: 0, error };
        }
    }
};
