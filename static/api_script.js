const fetchData = async () => {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        if (response.ok) {
            return data;
        }
        console.error('Error fetching data from /api/data:', data);
        throw new Error('Failed to fetch data from server.');
    } catch (error) {
        console.error('Error in fetchData:', error);
        throw error;
    }
};

const getYouTubeChannelData = async () => {
    const data = await fetchData();
    return data.youtube;
};

const getGitHubUserData = async () => {
    const data = await fetchData();
    return data.github;
};