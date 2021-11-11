
import { Dropbox } from "dropbox";



const objDropbox = new Dropbox({
	accessToken: 'LTGv34Fq2t8AAAAAAAAAAYfqnF1S_-C20wAbd0HUerTuj0sEBvMcVyeKUAcqt5E2',
	fetch
})

objDropbox.filesListFolder({
	path:''
}).then(res => console.log(res))

