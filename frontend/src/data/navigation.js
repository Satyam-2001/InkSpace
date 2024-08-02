import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TranslateIcon from '@mui/icons-material/Translate';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';

const navigation = [
    { name: 'Home', to: '/', Icon: HomeOutlinedIcon },
    { name: 'Fonts', to: '/fonts', Icon: TranslateIcon },
    { name: 'Pages', to: '/pages', Icon: AutoStoriesOutlinedIcon },
    { name: 'Projects', to: '/projects', Icon: FolderCopyOutlinedIcon },
    { name: 'Setting', to: '/settings', Icon: SettingsOutlinedIcon }
]

export default navigation;