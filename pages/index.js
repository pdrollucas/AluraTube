import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/menu";
import { StyledTimeline } from "../src/components/Timeline";
import { createClient } from '@supabase/supabase-js';
import { videoService } from "../src/services/videoService";
import Link from "next/link";

const PROJECT_URL = "https://rmdeiqldtsnhuiuuffmm.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtZGVpcWxkdHNuaHVpdXVmZm1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxOTQyMTEsImV4cCI6MTk4Mzc3MDIxMX0.4KhDXEAcyYHOjdbOk3wMTcNiy1F_M5RzR3eBOvBieFI";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function HomePage() {
    const service = videoService();
    const [valorDoFiltro, setValorDoFiltro] = React.useState(""); 
    //const playlists = {
        //"jogos": [],
        //};
    const [playlists, setPlaylists] = React.useState({});

    React.useEffect(() => {
        service.getAllVideos()
                .then((dados) => {
                    const novasPlaylists = {...playlists}
                    dados.data.forEach((video) => {
                        if(!novasPlaylists[video.playlist]){
                            novasPlaylists[video.playlist] = []
                        }
                        novasPlaylists[video.playlist].push(video);
                    })
                    setPlaylists(novasPlaylists);
                });
    }, []);


    return (
        <>
            <div style={{
                display:"flex",
                flexDirection: "column",
                flex: 1,
            }}>
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}/>
                <Header></Header>
                <TimeLine searchValue={valorDoFiltro} playlists={playlists} /* ou playlists={config.playlists} */ ></TimeLine>
            </div>
        </>
    );
  }

  export default HomePage;

 /* 
 function Menu (){
    return (
        <div>
            Menu
        </div>
    )
  }
*/

const StyledHeader = styled.div `

    background-color: ${({ theme }) => theme.backgroundLevel1};

    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    } 

    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
        margin-top: 15px;
    }
`;

const StyledBanner = styled.div`
    height: 230px;
    margin-top: 50px;
    background-image: url(${config.bg});
`
function Header (){
    return (
        <StyledHeader>
            <StyledBanner/>
            <section className="user-info">
                <img src= {`https://github.com/${config.github}.png`}/>
                <div>
                    <h2>{config.name}</h2>
                    <p>{config.job}</p>
                </div>
            </section>
        </StyledHeader>
    )
  }


  function TimeLine ({searchValue, ...propriedades}){

    const playlistNames = Object.keys(propriedades.playlists)
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = propriedades.playlists[playlistName];
                let countVideos = 0;

                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.filter((video) => {
                                const titleNormalized = video.title.toLowerCase();
                                const searchValueNormalized = searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormalized)
                            }).map ((video) => {
                                countVideos = countVideos + 1;
                                let idVideo;
                                const linkFormat =
                                  /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                                const match = video.url.match(linkFormat);
                                if (match && match[2].length == 11) {
                                    idVideo = match[2];
                                }
                                return (
                                    <Link 
                                        key={video.url} 
                                        href={{
                                            pathname: "/video",
                                            query: {
                                                v: idVideo,
                                                title: video.title,
                                            },
                                        }}>
                                            <img src={video.thumb} />
                                            <span>
                                                {video.title}
                                            </span>
                                    </Link>
                                )
                            })}
                            {countVideos === 0 ? "Nenhum video encontrado" : ""}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
  }

