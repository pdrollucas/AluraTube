import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from '@supabase/supabase-js';

// Custom Hook:
function useForm (propsDoForm){
    const [values, setValues] = React.useState(propsDoForm.initialValues);

    return {
        values,
        handleChange: (evento) => {
            const value = evento.target.value;
            const name = evento.target.name
            setValues({
                ...values,
                [name]: value, 
            });
        },
        
        clearForm(){
            setValues({})
        }
    };
}

const PROJECT_URL = "https://rmdeiqldtsnhuiuuffmm.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtZGVpcWxkdHNuaHVpdXVmZm1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxOTQyMTEsImV4cCI6MTk4Mzc3MDIxMX0.4KhDXEAcyYHOjdbOk3wMTcNiy1F_M5RzR3eBOvBieFI";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

// Pesquisar sobre GitHub Copilot e Tabnine (extensões)

function getThumbnail(url){
    return `https://img.youtube.com/vi/${url.split("v=")[1]/hqdefault.jpg}`;
}

/* function getVideoId (url){
    const videoId = url.split("v=")[1];
    const ampersandPosition = videoId.index0f("&");
    if (ampersandPosition !== 1){
        return videoId.substring(0, ampersandPosition);
    }
    return videoId;
}
*/
export default function RegisterVideo (){

    const formCadastro = useForm(
        {initialValues: { titulo: "", url: "", thumbnail: ""}
    });
    const [formVisivel, setFormVisivel] = React.useState(false);
    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true) }>
                +
            </button>

            {/* Pesquisar mais sobre -> Ternário */}
            {/* Pesquisar mais sobre -> Operadores de curto circuito */}
            {formVisivel ? (
                <form onSubmit={(evento) => {
                    evento.preventDefault();

                    // Contrato entre Front e BackEnd
                    supabase.from("video").insert({
                        title: formCadastro.values.titulo,
                        url: formCadastro.values.url,
                        thumb: getThumbnail(formCadastro.values.url),
                        playlist: "jogos",
                    })

                    setFormVisivel(false);
                    formCadastro.clearForm();
                }}>
                    <div>
                        <button type="button" className="close-modal" onClick={() => setFormVisivel(false) }>
                            X
                        </button>

                        <input 
                            placeholder="Título do vídeo" 
                            name="titulo"
                            value={formCadastro.values.titulo} 
                            onChange={formCadastro.handleChange}
                        />

                        <input 
                            placeholder="URL" 
                            name="url"
                            value={formCadastro.values.url} 
                            onChange={formCadastro.handleChange}
                        />

                        <input 
                            placeholder="URL da thumbnail" 
                            name="thumbnail"
                            value={formCadastro.values.thumbnail} 
                            onChange={formCadastro.handleChange}
                        />

                        <button type="submit">
                            Cadastrar
                        </button>
                    </div>
                </form>
            ): false }
        </StyledRegisterVideo>
    )
}