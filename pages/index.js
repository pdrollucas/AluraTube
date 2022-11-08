import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/menu";
import { StyledTimeline } from "../src/components/Timeline";

function HomePage() {
    const estilosHomePage = { 
        // backgroundColor:"red" 
    };
    const [valorDoFiltro, setValorDoFiltro] = React.useState(""); 
    return (
        <>
            <CSSReset />
            <div style={estilosHomePage}>
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}/>
                <Header></Header>
                <TimeLine searchValue={valorDoFiltro} playlists={config.playlists}></TimeLine>
            </div>
        </>
    );
  }

  export default HomePage

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

                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.filter((video) => {
                                const titleNormalized = video.title.toLowerCase();
                                const searchValueNormalized = searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormalized)
                            }).map ((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb}></img>
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
  }

