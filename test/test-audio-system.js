import AudioClip from '../core/audio/audioclip.js'
import AudioLoader from '../core/audio/audioloader.js'
import AudioPlayer from '../core/audio/audioplayer.js'

const audioPlayer = AudioPlayer.getInstance()
const audioLoader = audioPlayer.getAudioLoader()

audioPlayer.requestAudioUnlock(document.body, "Quer Ativar o audio?").then(state => {
    
    if (state) {
        audioLoader.loadAudioClip('\\..\\resources\\audio\\tick_tock_clock.wav').then(clip => {
            audioPlayer.play(clip, () => {
                console.log('end')
            })
        })
    }
    
})
