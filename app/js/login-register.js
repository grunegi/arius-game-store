import { supabase } from "../lib/Supabase";

{/*login check*/}
export async function loginCheck(email, password) {
    
    const {data , error} = await supabase
      .from("users")
      .select("*")
      .eq("email",email)
      .eq("password",password);

    if(error || !data) {
       console.log("error is : ", error);
       return null;
    }

    console.log("Email:", email);
    console.log("Password:", password);

    return data[0];
}


{/*register user*/}
export async function registerUser(userData) {
  const {data, error} = await supabase
    .from("users")
    .insert([
      {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      }
    ])
    .select()
  
  if(error) {
    console.log(error);
  }

  return data;
}


{/*email check for forgot password*/}
export async function emailCheck(email) {
  const {data, error} = await supabase
    .from("users")
    .select("*")
    .eq("email", email);

   if(error || !data) {
       console.log("error is : ", error);
       return null;
    }

  console.log("Email:", email);

  return data;
}


{/*update user data*/}
export async function updateUser(userId, userData) {
  const { data, error } = await supabase
    .from("users")
    .update(userData)
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}


{/*update and read avatar*/}
export async function uploadAvatar(file) {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(fileName, file);

  if (error) {
    console.error(error);
    return null;
  }

  const { data } = supabase.storage
    .from("avatars")
    .getPublicUrl(fileName);

  return data.publicUrl;
}