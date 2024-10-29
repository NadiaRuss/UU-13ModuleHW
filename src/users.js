export async function fetchUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) {
      throw new Error(
        `Network response was not ok, status: ${response.status}`
      );
    }
    const users = await response.json();
    users.forEach((user) => {
      console.log(user.name);
    });
    return users;

  } catch (error) {
    console.error('Произошла ошибка при получении данных с сервера: ', error);
    throw error;
  }
}

