export const fetchTutors = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors`);
    if (!response.ok) throw new Error('Failed to fetch tutors');
    return response.json();
};

export const deleteTutor = async (key) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors/${key}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete tutor');
};