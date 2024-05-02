import React, { useState } from 'react'
import youtube from '../youtubeAPI'

function SearchBar ({onSubmit}){
    const [term, setTerm] = useState("")

    const onFormSubmit = (event) => {
        event.preventDefault()

        onSubmit(term)
    }

    return(
            <div className="ui segment" style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
                <form onSubmit={onFormSubmit} className="ui form">
                    <div className="field">
                        <label>Videos Search
                            <input 
                                type="text" 
                                value={term} 
                                onChange={(event) => setTerm(event.target.value)}
                            />
                        </label>
                    </div>
                </form>
            </div>
    )
}

function VideoItem ({video, setSelectedVideo}){
    return (
        <div onClick={() => setSelectedVideo(video)} style={{ cursor: 'pointer', marginBottom: '-5px'}}>
            <div style={{ display: "flex" }}>
                <div style={{ flex: "1" }}>
                    <img
                        className='image'
                        src={video.snippet.thumbnails.medium.url}
                        alt={video.snippet.title}
                        style={{ width: '100%' }}
                    />
                </div>
                <div style={{ flex: "1"}}>
                    <h4 style={{ width: '100%', marginLeft: '10px'}}>{video.snippet.title}</h4>
                </div>
            </div>
        </div>
    )
}


function ListVideo ({videos, setSelectedVideo}){
    const divVideos = videos.map((video, index) => {
                        return (
                            <div>
                                <VideoItem
                                    key={index}
                                    video={video}
                                    setSelectedVideo={setSelectedVideo}
                                />
                                {index !== videos.length - 1 && <hr />}
                            </div>
                        )
                    })
    
    return (
        <div>{divVideos}</div>
    )
}

function DetailVideo({selectedVideo}){
    const videoSrc = `https://www.youtube.com/embed/${selectedVideo.id.videoId}`

    return (
        <div>
            <div>
                <iframe 
                    title='video player' 
                    src={videoSrc} 
                    style={{ 
                        width: '100%',
                        maxWidth: '860px', 
                        height: 'calc(100vw * 9 / 16)',
                        maxHeight: '480px'
                    }}
                    allowFullScreen
                />
            </div>
            <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                <h2 className='header'>{selectedVideo.snippet.title}</h2>
                <p>{selectedVideo.snippet.description}</p>
            </div>
        </div>
    )
}

// class Youtube extends React.Component {
//     state = { 
//         videos: [],
//         selectedVideo: null
//     }

//     setSelectedVideo = (video) => {
//         this.setState({selectedVideo: video})
//     }

//     onSearchSubmit = async (term) => {
//         const response = await youtube.get("/search", {
//             params: {
//                 q: term
//             }
//         })

//         this.setState({ videos: response.data.items }, () => {
//             console.log(this.state.videos)
//             this.setState({selectedVideo: this.state.videos[0]}, () => {
//                 console.log(this.state.selectedVideo)
//                 console.log(this.state.selectedVideo.snippet.thumbnails.medium.url)
//             })
//         })
//     }

//     componentDidMount(){
//         this.onSearchSubmit("pow patrol")
//     }

//     render() {
//         return (
//             <div className="ui container" style={{ marginTop: "10px"}}>
//                 <SearchBar onSubmit={this.onSearchSubmit} />
//                 <div style={{ marginTop: "10px", display: "flex" }}>
//                     <div style={{ flex: "2.5", marginRight: "20px" }}>
//                     {this.state.videos.length > 0 && (
//                         <div>
//                         {this.state.selectedVideo && (
//                                 <div>
//                                     <DetailVideo
//                                         selectedVideo={this.state.selectedVideo}
//                                     />
//                                 </div>
//                             )}
//                         </div>
//                     )}
//                     </div>
                    
//                     <div style={{ flex: "1" }}>
//                         {this.state.videos.length > 0 && (
//                             <ListVideo
//                                 videos={this.state.videos}
//                                 setSelectedVideo={this.setSelectedVideo}
//                             />
//                         )}
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }


function Youtube(){
    const [state, setState] = useState({
        videos: [],
        selectedVideo: null
    })

    const setSelectedVideo = (video) => {
        setState(previousState => {
            return {
                ...previousState,
                selectedVideo: video
            }
        })
    }

    const onSearchSubmit = async (term) => {
        const response = await youtube.get("/search", {
            params: {
                q: term
            }
        })

        setState({
            ...state,
            videos: response.data.items,
            selectedVideo: response.data.items[0]
        })
    }

    return (
        <div className="ui container" style={{ marginTop: "10px"}}>
            <SearchBar onSubmit={onSearchSubmit} />
            <div style={{ marginTop: "10px", display: "flex" }}>
                <div style={{ flex: "2.5", marginRight: "20px" }}>
                {state.videos.length > 0 && (
                    <div>
                    {state.selectedVideo && (
                            <div>
                                <DetailVideo
                                    selectedVideo={state.selectedVideo}
                                />
                            </div>
                        )}
                    </div>
                )}
                </div>
                
                <div style={{ flex: "1" }}>
                    {state.videos.length > 0 && (
                        <ListVideo
                            videos={state.videos}
                            setSelectedVideo={setSelectedVideo}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}



export default Youtube