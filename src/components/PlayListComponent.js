import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import { request } from 'http';

class PlayListComponent extends Component {
    state = {
        playLists: [],
        songLists: [],
        songs:[],
        newPlayListData: {
          id: '',
          name: '',
          description: ''
        },
        editPlayListData: {
          id: '',
          name: '',
          description: ''
        },
        newSongListData: {
          title: "",
          artist: "",
          album: "",
          releaseDate: "",
          downloadDate: ""
        },
        songListData: {
          title: "",
          artist: "",
          album: "",
          releaseDate: "",
          downloadDate: ""
        },
        editsongListData: {
          title: "",
          artist: "",
          album: "",
          releaseDate: "",
          downloadDate: ""
        },
        newPlayListModal: false,

        newSongListModal: false,

        editPlayListModal: false,

        songModal: false,

        editSongListModal: false
      }
    
      componentWillMount(){
        axios.get('http://localhost:8080/playlist').then((response) =>{
          this.setState({
            playLists:response.data
          });
        });

        axios.get('http://localhost:8080/playlist').then((response) =>{
          this.setState({
            songs:response.data
          });
        });

      }
      toggleNewPlayListModal() {
        this.setState({
          newPlayListModal: !this.state.newPlayListModal
        })
      }
      toggleNewSongListModal() {
        this.setState({
          newSongListModal: !this.state.newSongListModal
        })
      }
      toggleeditPlayListModal() {
        this.setState({
          editPlayListModal: !this.state.editPlayListModal
        })
      }

      toggleSongModal() {
        this.setState({
          songModal: !this.state.songModal
        })
      }

      toggleeditSongListModal(){
        this.setState({
          editSongListModal: !this.state.editSongListModal
        })
      }
    
      // addSong() {
      //    axios.get('http://localhost:8080/addNew', {
      //      params:{
      //        name: this.state.newPlayListData.name,
      //        description: this.state.newPlayListData.description
      //      }
      //    }).then((response) => {
      //     let { playLists } = this.state;        
      
    
      //    });
      // }

      addSong(){
        let { playLists } = this.state; 
        fetch('http://localhost:8080/addNew', {
          method: 'POST',
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          body: JSON.stringify({
            name: this.state.newPlayListData.name, description: this.state.newPlayListData.description
          })
        }).then((response) => {
          this._refreshPage();
          this.setState({
            playLists, newPlayListModal: false, newPlayListData: {
              name: '',
              description: ''
            }
          });
        })
      }

      addNewSong(){
        let { songLists } = this.state; 
        fetch('http://localhost:8080/addNewSong', {
          method: 'POST',
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          body: JSON.stringify({
            title: this.state.songListData.title, artist: this.state.songListData.artist, album: this.state.songListData.album, releaseDate: this.state.songListData.releaseDate, downloadDate: this.state.songListData.downloadDate
          })
        }).then((response) => {
          this._refreshPage();
          this.setState({
            songLists, newSongListModal: false, newSongListData: {
              title: '',
              artist: '',
              album: "",
              releaseDate: "",
              downloadDate: ""
            }
          });
        })
      }
      updateSong(){
        let { name, description  } = this.state.editPlayListData;
        // let playLists = this.state.playLists.map((playList) => {
          axios.get('http://localhost:8080/update', {
          params:{
            id: this.state.editPlayListData.id, name: this.state.editPlayListData.name, description: this.state.editPlayListData.description
          }
        }).then((response) => {
          this._refreshPage();
          this.setState({
             editPlayListModal: false, editPlayListData: {
              name: '',
              description: ''
            }
          });
        })
      // })
      }

      updateSongList(){
        let { title,artist,album,releaseDate,downloadDate  } = this.state.editsongListData;
        // let playLists = this.state.playLists.map((playList) => {
          axios.get('http://localhost:8080/update', {
          params:{
            id: this.state.editPlayListData.id, name: this.state.editPlayListData.name, description: this.state.editPlayListData.description
          }
        }).then((response) => {
          this._refreshPage();
          this.setState({
             editPlayListModal: false, editPlayListData: {
              name: '',
              description: ''
            }
          });
        })
      // })
      }


      editPlayList(id,name, description){
        this.setState({
          editPlayListData:{id,name, description,id}, editPlayListModal: ! this.state.editPlayListModal
        });
      }

      editSongList(id,title,artist,album,releaseDate,downloadDate){
        this.setState({
          editsongListData:{id,title,artist,album,releaseDate,downloadDate}, editSongListModal: ! this.state.editSongListModal
        });
      }

      deletePlayList(id){
        axios.get("http://localhost:8080/delete",{
          params:{
            id: id
          }
        }).then((response) =>{
            this._refreshPage();
                  });
      }

      getSongs(id){
        axios.get('http://localhost:8080/songs', {
          params: {
            id: id
          }
        }).then((response) =>{
          console.log(response.data.songs);
          this.setState({
            songLists:response.data.songs, songModal: !this.state.songModal
          });
        });
      }

      _refreshPage(){
        axios.get('http://localhost:8080/playlist').then((response) => {
          this.setState({
            playLists: response.data
          })
        });
      }

          render() {
            let playLists = this.state.playLists.map((playList) => {              
              return(
                  <tr key={playList.id}>            
                  <h3 className="leftMenu"  onClick={this.getSongs.bind(this, playList._id)}><td>{playList.name}</td></h3>
                  <td>
                    <Button color="success" size="sm" className="mr-2" onClick={this.editPlayList.bind(this, playList._id, playList.name, playList.description)}>Edit</Button>
                    <Button color="danger" size="sm" onClick={this.deletePlayList.bind(this, playList._id)}>Delete</Button>
                  </td>
                </tr>
                ) 
            })

            let songLists = this.state.songLists.map((songList) => {
              return(
                    <tr key={songList.id}>
                    <td>{songList.title}</td>
                    <td>{songList.artist}</td>
                    <td>{songList.album}</td>
                    <td>{songList.releaseDate}</td>
                    <td>{songList.downloadDate}</td>
                    <td>
                      <Button color="success" size="sm" className="mr-2" onClick={this.editSongList.bind(this, songList._id, songList.title, songList.artist,songList.album,songList.releaseDate,songList.downloadDate)}>Edit</Button>
                      <Button color="danger" size="sm">Delete</Button>
                    </td>
                  </tr>
              )
            })

            // let songLists = ""
            // let songs = this.state.songs.map((song) => {
            //   // (typeof (song.songs) == 'undefined') ?
            //   songLists = song.songs.map((songList) => {
            //     return (
            //       <tr key={songList.id}>
            //         <td>{songList.title}</td>
            //         <td>{songList.artist}</td>
            //         <td>{songList.album}</td>
            //         <td>{songList.ReleaseDate}</td>
            //         <td>{songList.DownloadDate}</td>
            //         <td>
            //           <Button color="success" size="sm" className="mr-2">Edit</Button>
            //           <Button color="danger" size="sm">Delete</Button>
            //         </td>
            //       </tr>
        
            //     )
            //   })
            // });            
            return(
            <div>
              <meta charSet="UTF-8" />
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
              <style dangerouslySetInnerHTML={{__html: "\n    .main{\n      position: relative;\n      text-align: center;\n      color: white;\n    }\n\n    .LeftMenuBar{\n      position: absolute;\n      top: 8px;\n      left: 16px;\n      margin-left:0%;\n      text-align: left;\n      border-right: 2px solid #f5f5f5;\n      width: 15%;\n      height: 100%;\n    }\n\n    .btn {\n      background-color: Green;\n      border: none;\n      color: white;\n      padding: 5px 5px;\n      font-size: 16px;\n      cursor: pointer;\n      border-radius: 5%;\n    }\n    .btn1{\n\n      width:30px;\n      height:30px;\n      border: 2px solid #f5f5f5;\n      border-radius: 50%;\n      color:white;\n      background-color: green;\n      text-align:center;\n      text-decoration:none;\n      box-shadow: 0 0 3px gray;\n      font-weight:bold;\n      cursor: pointer;\n\n    }\n\n    .btn:hover {\n      background-color: RoyalBlue;\n    }\n    .btn1:hover{\n      background-color: RoyalBlue;\n    }\n    .leftMenu:hover{\n      background-color: Green;\n      cursor: pointer;\n    }\n\n    h3{\n\n      color: white;\n      font-family: Lucida Sans Unicode, Lucida Grande, sans-serif;\n    }\n\n    .createBtn{\n    border-top:  2px solid #f5f5f5;\n    }\n     #playListForm{\n      border-radius: 5px;\n      background-color: white;\n      /*padding: 20px;*/\n      font-family: Georgia, serif;\n      width: 0%;\n      margin-left: auto;\n      margin-right: auto;\n      display: block;\n       overflow-x: hidden;\n       z-index: 1;\n       transition:width 0.9s;\n       top: 0;\n       right: 0;\n       position: fixed;\n    }\n\n    #Name {\n      width: 100%;\n      padding: 12px 20px;\n      margin: 8px 0;\n      display: inline-block;\n      border: 1px solid #ccc;\n      box-sizing: border-box;\n    }\n    #Description {\n      width: 100%;\n      padding: 12px 20px;\n      margin: 8px 0;\n      display: inline-block;\n      border: 1px solid #ccc;\n      box-sizing: border-box;\n\n    }\n\n    .btn2{\n      background-color: #4CAF50;\n      color: white;\n      padding: 12px 20px;\n      border: none;\n      border-radius: 4px;\n      cursor: pointer;\n      margin-left: 45%;\n      margin-top: 2%;\n    }\n  " }} />
              <title>My Playlist Application</title>
              <h1 style={{textAlign: 'center', fontFamily: 'Lucida Sans Unicode, Lucida Grande, sans-serif', color: 'white'}}> Playlist Application </h1>
              <div className="main">
                <img src= {require('./main.png')} alt="main" style={{width: '70%', marginLeft: '15%'}} />
                <div className="LeftMenuBar">
                  <h3 className="leftMenu"><button className="btn"><i className="fa fa-home" /></button>HOME </h3>
                  <h3 className="leftMenu"><button className="btn"><i className="fa fa-bars" /></button>BROWSE</h3> <br />
                  <p style={{color: '#888888'}}>YOUR MUSIC</p>
                  <h3 className="leftMenu" style={{color: 'white'}}>Recently Played</h3>
                  <h3 className="leftMenu" style={{color: 'white'}}>Liked Songs</h3>
                  <h3 className="leftMenu" style={{color: 'white'}}>Albums</h3>
                  <h3 className="leftMenu" style={{color: 'white'}}>Artists</h3>
                  <h3 className="leftMenu" style={{color: 'white'}}>Playlists</h3> <br /><br /><br /><br /><br /><br />
                  <div className="createBtn">
                    <h3><Button color="primary" className="btn1" onClick={this.toggleNewPlayListModal.bind(this)}><i className="fa fa-plus" /></Button>New Playlist</h3></div>
                </div>
              </div>
              <div id="playListForm">
                <button className="btn" onclick="closePlayListForm()"><i className="fa fa-close" /></button>
                <h2 style={{textAlign: 'center'}}>Create Playlist</h2>
                Name <input type="text" id="Name" name="Name" placeholder="My playlist" style={{borderRadius: '5px'}} />
                Description <textarea id="Description" name="Description" placeholder="Give your playlist a catchy description" style={{borderRadius: '5px'}} defaultValue={""} />
                <button className="btn2">Save</button>
              </div>

            <Table>
          <thead>
            <tr>
              <th style={{color: '#888888'}}>Name</th>
            </tr>
          </thead>

          <tbody style={{color: 'white'}} >
           {playLists} 
          </tbody>
        </Table>
    
              <Modal isOpen={this.state.newPlayListModal} toggle={this.toggleNewPlayListModal.bind(this)} >
              <ModalHeader toggle={this.toggleNewPlayListModal.bind(this)}>Create PlayList</ModalHeader>
    
              <ModalBody>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input id="name" placeholder = "My playlist" value={this.state.newPlayListData.name} onChange={(e) => {
    
                    let { newPlayListData } = this.state;
    
                    newPlayListData.name = e.target.value;
    
                    this.setState({ newPlayListData });
                  }} />
    
                  <Label for="description">Description</Label>
                  <Input id="description" placeholder = "Give your playlist a catchy description" value={this.state.newPlayListData.description} onChange={(e) => {
    
                    let { newPlayListData } = this.state;
    
                    newPlayListData.description = e.target.value;
    
                    this.setState({ newPlayListData });
                  }} />
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.addSong.bind(this)}>Create</Button>{' '}
                <Button color="secondary" onClick={this.toggleNewPlayListModal.bind(this)}>Cancel</Button>
              </ModalFooter>
            </Modal>


<Modal isOpen={this.state.editPlayListModal} toggle={this.toggleeditPlayListModal.bind(this)} >
              <ModalHeader toggle={this.toggleeditPlayListModal.bind(this)}>Edit PlayList</ModalHeader>
    
              <ModalBody>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input id="name" placeholder = "My playlist" value={this.state.editPlayListData.name} onChange={(e) => {
    
                    let { editPlayListData } = this.state;
    
                    editPlayListData.name = e.target.value;
    
                    this.setState({ editPlayListData });
                  }} />
    
                  <Label for="description">Description</Label>
                  <Input id="description" placeholder = "Give your playlist a catchy description" value={this.state.editPlayListData.description} onChange={(e) => {
    
                    let { editPlayListData } = this.state;
    
                    editPlayListData.description = e.target.value;
    
                    this.setState({ editPlayListData });
                  }} />
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.updateSong.bind(this)}>Update PlayList</Button>{' '}
                <Button color="secondary" onClick={this.toggleeditPlayListModal.bind(this)}>Cancel</Button>
              </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.editSongListModal} toggle={this.toggleeditSongListModal.bind(this)} >
              <ModalHeader toggle={this.toggleeditSongListModal.bind(this)}> PlayList</ModalHeader>
    
              <ModalBody>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input id="title" placeholder = "Title" value={this.state.editsongListData.title} onChange={(e) => {
    
                    let { editsongListData } = this.state;
    
                    editsongListData.title = e.target.value;
    
                    this.setState({ editsongListData });
                  }} />
    
                  <Label for="artist">Artist</Label>
                  <Input id="artist" placeholder = "Artist" value={this.state.editsongListData.artist} onChange={(e) => {
    
                    let { editsongListData } = this.state;
    
                    editsongListData.artist = e.target.value;
    
                    this.setState({ editsongListData });
                  }} />

                  <Label for="album">Album</Label>
                  <Input id="album" placeholder = "Album" value={this.state.editsongListData.album} onChange={(e) => {
    
                    let { editsongListData } = this.state;
    
                    editsongListData.album = e.target.value;
    
                    this.setState({ editsongListData });
                  }} />

                  <Label for="ReleaseDate">ReleaseDate</Label>
                  <Input id="ReleaseDate" placeholder = "ReleaseDate" value={this.state.editsongListData.releaseDate} onChange={(e) => {
    
                    let { editsongListData } = this.state;
    
                    editsongListData.releaseDate = e.target.value;
    
                    this.setState({ editsongListData });
                  }} />

                 <Label for="DownloadDate">DownloadDate</Label>
                  <Input id="DownloadDate" placeholder = "DownloadDate" value={this.state.editsongListData.downloadDate} onChange={(e) => {
    
                    let { editsongListData } = this.state;
    
                    editsongListData.downloadDate = e.target.value;
    
                    this.setState({ editsongListData });
                  }} />

                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.updateSong.bind(this)}>Update PlayList</Button>{' '}
                <Button color="secondary" onClick={this.toggleeditSongListModal.bind(this)}>Cancel</Button>
              </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.newSongListModal} toggle={this.toggleNewSongListModal.bind(this)} >
              <ModalHeader toggle={this.toggleNewSongListModal.bind(this)}> PlayList</ModalHeader>
    
              <ModalBody>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input id="title" placeholder = "Title" value={this.state.newSongListData.title} onChange={(e) => {
    
                    let { newSongListData } = this.state;
    
                    newSongListData.title = e.target.value;
    
                    this.setState({ newSongListData });
                  }} />
    
                  <Label for="artist">Artist</Label>
                  <Input id="artist" placeholder = "Artist" value={this.state.newSongListData.artist} onChange={(e) => {
    
                    let { newSongListData } = this.state;
    
                    newSongListData.artist = e.target.value;
    
                    this.setState({ newSongListData });
                  }} />

                  <Label for="album">Album</Label>
                  <Input id="album" placeholder = "Album" value={this.state.newSongListData.album} onChange={(e) => {
    
                    let { newSongListData } = this.state;
    
                    newSongListData.album = e.target.value;
    
                    this.setState({ newSongListData });
                  }} />

                  <Label for="ReleaseDate">ReleaseDate</Label>
                  <Input id="ReleaseDate" placeholder = "ReleaseDate" value={this.state.newSongListData.releaseDate} onChange={(e) => {
    
                    let { newSongListData } = this.state;
    
                    newSongListData.releaseDate = e.target.value;
    
                    this.setState({ newSongListData });
                  }} />

                 <Label for="DownloadDate">DownloadDate</Label>
                  <Input id="DownloadDate" placeholder = "DownloadDate" value={this.state.newSongListData.downloadDate} onChange={(e) => {
    
                    let { newSongListData } = this.state;
    
                    newSongListData.downloadDate = e.target.value;
    
                    this.setState({ newSongListData });
                  }} />

                </FormGroup>
              </ModalBody>
              <ModalFooter>
              <Button color="primary" onClick={this.addNewSong.bind(this)}>Add Song</Button>{' '}
                <Button color="secondary" onClick={this.toggleNewSongListModal.bind(this)}>Cancel</Button>
              </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.songModal} toggle={this.toggleSongModal.bind(this)}>
            <ModalHeader toggle={this.toggleSongModal.bind(this)}>Edit </ModalHeader>
            <Table responsive>
          <thead>
            <tr>
              <th style={{color: '#888888'}}>Title</th>
              <th style={{color: '#888888'}}>Artist</th>
              <th style={{color: '#888888'}}>Album</th>
              <th style={{color: '#888888'}}>Release Date</th>
              <th style={{color: '#888888'}}>Download Date</th>
            </tr>
          </thead>

          <tbody>
            {songLists} 
          </tbody>
          <Button color="primary"onClick={this.toggleNewSongListModal.bind(this)}>Add a new song</Button>
        </Table> 

            </Modal>


            </div>
            
            );
          }
}
export default PlayListComponent;