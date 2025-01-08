
export default function githubUrlValidation(url: string) {
  // const regex = /^(https?:\/\/)?(www\.)?github\.com\/(?<user>[a-zA-Z0-9_-]+)\/(?<repo>[a-zA-Z0-9_-]+)/gm;
  const regex = /^(https?:\/\/)?(www\.)?github\.com\/(?<user>[^\/]+)\/(?<repo>[^\/]+)?\/?$/;

  const { user = '', repo = ''} = regex
    .exec(url).groups;

  const isValid = regex.test(url);
  
  return {
    user,
    repo,
    isValid
  }
}
