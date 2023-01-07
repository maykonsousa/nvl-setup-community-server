import axios from "axios";

export const GetGithubData = async (githubProfile: string) => {
  if (!githubProfile) return { avatarUrl: null, bio: null };

  const userName = githubProfile.split("/").pop();
  const url = `https://api.github.com/users/${userName}`;
  const { avatar_url, bio } = await axios
    .get(url)
    .then((response) => response.data);

  return { avatarUrl: avatar_url, bio };
};
