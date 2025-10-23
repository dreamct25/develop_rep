{#if getLoccalSettingStatus}
    <div class="header">
        <h1>{$i18n.t('webTitle')}</h1>
        <div class="right">
            {#if isLocalService}
                <div class="right-sub-area">
                    <div>
                        <div>{$i18n.t('currentPath')}：</div>
                        <div>{currentDirTemp || currentDirEnv}</div>
                    </div>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div class="change-path-btn" on:click={() => openLocalSettingModal = true}>
                        <FontAwesomeIcon icon={faSync} />
                        <Tooltip pos={{ x:-73, y:-66 }} width={150}>{$i18n.t('changeFolderPath')}</Tooltip>
                    </div>
                    
                </div>
            {:else}
                <div>{$i18n.t('currentPath')}：</div>
                <div>{currentDirTemp || currentDirEnv}</div> 
            {/if}
        </div>
    </div>
{/if}
{#if getLoccalSettingStatus}
    <div class="main">
        {#if !rwdStatus}
            <div class="file-list-header">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div 
                    class={currentDirTemp ? "prev-btn active" : "prev-btn"}
                    on:click={actionDictionary}
                >
                    <FontAwesomeIcon icon={faAngleLeft} />
                    <Tooltip pos={{ x: currentLanguage === 'en' ? -68 : -33,y:-67 }} width={currentLanguage === 'en' ? 150 : 80}>{$i18n.t('prevFolder')}</Tooltip>
                </div>
                <div class={isUpload ? 'upload-btn disactive' : 'upload-btn'}>
                    {$i18n.t('uploadBtn')}
                    <input type="file" title="" disabled={isUpload} class='upload' on:change={inputUploadEvent} multiple={true} />
                </div>
                <div class="upload-progress-bar">
                    <div class={!['uploadStatus.uploading','uploadStatus.ready'].includes(progressTxt) ? 'upload-progress-bar-inner active' : 'upload-progress-bar-inner'} style="width:{count === -1 ? 0 : count}%;"></div>
                    <div class="progress-text">{['uploadStatus.ready'].includes(progressTxt) ? $i18n.t(progressTxt) : `${$i18n.t(progressTxt)} `}{count !== -1 ? `${Math.floor(count)} %` : ''}</div>
                </div>
                <div class="fn-group">
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div class={listShortIcon ? "fn active" : "fn"} on:click={() => listShortIcon = true}>
                        <FontAwesomeIcon icon={faGripHorizontal} />
                        <Tooltip pos={{ x:0,y:-40 }} width={70}>{$i18n.t('shortList')}</Tooltip>
                    </div>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div class={!listShortIcon ? "fn active" : "fn"} on:click={() => listShortIcon = false}>
                        <FontAwesomeIcon icon={faList} />
                        <Tooltip pos={{ x:0,y:-40 }} width={70}>{$i18n.t('detailList')}</Tooltip>
                    </div>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div class="fn" on:click={shortDate}>
                        <FontAwesomeIcon icon={listDataDateSort ? faArrowUpShortWide : faArrowDownWideShort} />
                        <Tooltip pos={{ x:0,y:-40 }} width={115}>{$i18n.t(listDataDateSort ? "sortLateDate" : "sortLatestDate")}</Tooltip>
                    </div>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    {#if currentIp}
                        <div class="fn">
                            <FontAwesomeIcon icon={faQrcode} />
                            <Tooltip pos={{ x:0,y:-72 }} width={95} padding="0px">
                                <div class="qr-code-outer">
                                    <QRCodeImage displayType="canvas" text={currentIp} width={110} />
                                </div>
                            </Tooltip>
                        </div>
                    {/if}
                </div>
            </div>
        {:else}
            <div class="file-list-header-rwd">
                <div class="top">
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div 
                        class={currentDirTemp ? "prev-btn active" : "prev-btn"}
                        on:click={actionDictionary}
                    ><FontAwesomeIcon icon={faAngleLeft} /></div>
                    <div class={isUpload ? 'upload-btn disactive' : 'upload-btn'}>
                        {$i18n.t('uploadBtn')}
                        <input type="file" title="" disabled={isUpload} class='upload' on:change={inputUploadEvent} multiple={true} />
                    </div>
                </div>
                <div class="upload-progress-bar">
                    <div class={!['uploadStatus.uploading','uploadStatus.ready'].includes(progressTxt) ? 'upload-progress-bar-inner active' : 'upload-progress-bar-inner'} style="width:{count === -1 ? 0 : count}%;"></div>
                    <div class="progress-text">{['uploadStatus.ready'].includes(progressTxt) ? $i18n.t(progressTxt) : `${$i18n.t(progressTxt)} `}{count !== -1 ? `${Math.floor(count)} %` : ''}</div>
                </div>
                <div class="fn-group">
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div class={listShortIcon ? "fn active" : "fn"} on:click={() => listShortIcon = true}>
                        <FontAwesomeIcon icon={faGripHorizontal} />
                    </div>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div class={!listShortIcon ? "fn active" : "fn"} on:click={() => listShortIcon = false}>
                        <FontAwesomeIcon icon={faList} />
                    </div>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div class="fn" on:click={shortDate}>
                        <FontAwesomeIcon icon={listDataDateSort ? faArrowUpShortWide : faArrowDownWideShort} />
                    </div>
                </div>
            </div>
        {/if}
        <div class="file-list-outer">
            {#if !listShortIcon}
                <div class="file-list">
                    {#if foldersItem.length > 0}
                        {#each foldersItem as items}
                            <div class="file-list-item">
                                {#if items.isFolder}
                                    {#if !rwdStatus}
                                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                                        <div
                                            on:click={cdDictionary.bind(undefined,items.fileUrl)}
                                            class="folder file-name" 
                                        >
                                            <span><FontAwesomeIcon icon={renderIcon(items.fileType)} />{items.fileName}</span>
                                            <span>{formatDateTime({ formatDate: items.fileCreateTime, formatType: 'yyyy-MM-dd HH:mm:ss' })}</span>
                                        </div>
                                    {:else}
                                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                                        <div
                                            on:click={cdDictionary.bind(undefined,items.fileUrl)}
                                            on:touchstart={e => touchsEventObj = e }
                                            on:press={() => showOptionList(touchsEventObj)}
                                            use:press={{ 
                                                timeframe:1000,
                                                triggerBeforeFinished: true
                                            }}
                                            
                                            class="folder file-name" 
                                        >
                                            <span><FontAwesomeIcon icon={renderIcon(items.fileType)} />{items.fileName}</span>
                                        </div>
                                    {/if}
                                {:else}
                                    {#if !rwdStatus}
                                        <div class="file-name">
                                            <span>
                                                <FontAwesomeIcon icon={renderIcon(items.fileType)} />
                                                <span>{items.fileName}</span>
                                            </span>
                                            <span>{formatDateTime({ formatDate: items.fileCreateTime, formatType: 'yyyy-MM-dd HH:mm:ss' })}</span>
                                        </div>
                                    {:else}
                                        <div 
                                            class="file-name"
                                            on:touchstart={e => touchsEventObj = e }
                                            on:press={() => showOptionList(touchsEventObj)}
                                            use:press={{ 
                                                timeframe:1000,
                                                triggerBeforeFinished: true
                                            }}
                                            
                                        >
                                            <span>
                                                <FontAwesomeIcon icon={renderIcon(items.fileType)} />
                                                <span>{items.fileName}</span>
                                            </span>
                                        </div>
                                    {/if}
                                {/if}
                            </div>
                        {/each}
                    {:else}
                        {#if !rwdStatus}
                            <div class="no-data">{$i18n.t('noAnyFile')}</div>
                        {:else}
                            <div 
                                class="no-data"
                                on:touchstart={(e) => touchsEventObj = e }
                                on:press={() => showOptionList(touchsEventObj)}
                                use:press={{ 
                                    timeframe:1000,
                                    triggerBeforeFinished: true
                                }}
                                
                            >{$i18n.t('noAnyFile')}</div>
                        {/if}
                    {/if}
                </div>
            {:else}
                <div class={foldersItem.length > 0 ? "file-list-short" : "file-list-short disgrid"}>
                    {#if foldersItem.length > 0}
                        {#each foldersItem as items}
                            {#if items.fileType === '.folder'}
                                {#if !rwdStatus}
                                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                                    <div class="file-list-item-folder"on:click={cdDictionary.bind(undefined,items.fileUrl)}>
                                        <div class="icon"><FontAwesomeIcon icon={renderIcon(items.fileType)} /></div>
                                        <div class="folder file-name" >{items.fileName}</div>
                                    </div>
                                {:else}
                                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                                    <div class="file-list-item-folder"
                                        on:click={cdDictionary.bind(undefined,items.fileUrl)}
                                        on:touchstart={e => touchsEventObj = e }
                                        on:press={() => showOptionList(touchsEventObj)}
                                        use:press={{ 
                                            timeframe:1000,
                                            triggerBeforeFinished: true
                                        }}
                                    >
                                        <div class="icon"><FontAwesomeIcon icon={renderIcon(items.fileType)} /></div>
                                        <div class="folder file-name" >{items.fileName}</div>
                                    </div>
                                {/if}
                            {:else}
                                {#if !rwdStatus}
                                    <div class="file-list-item">
                                        {#if new RegExp('^.*\.(jpg|JPG|gif|GIF|jpeg|JPEG|png|PNG|TIFF|tiff|TIF|tif)$').test(items.fileType)}
                                            <div class="img-outer-frame">
                                                <div class={`loading ${items.fileLoadStatus ? '' : 'active'}`}>{$i18n.t('loadingPhoto')}</div>
                                                <div class="img-outer">
                                                    <div class="img-frame">
                                                        <img
                                                            on:load={(event) => whenLoadImg(items.fileName,event)} 
                                                            src={`${API_URL}/preview?f=${btoa(encodeURIComponent(items.fileUrl))}`} 
                                                            alt="" 
                                                        />
                                                    </div>
                                                </div> 
                                            </div>
                                        {:else}
                                            <div class="icon"><FontAwesomeIcon icon={renderIcon(items.fileType)} /></div>
                                        {/if}
                                        <div class="file-name">{items.fileName}</div>
                                    </div>
                                {:else}
                                    <div class="file-list-item"
                                        on:touchstart={e => touchsEventObj = e }
                                        on:press={() => showOptionList(touchsEventObj)}
                                        use:press={{ 
                                            timeframe:1000,
                                            triggerBeforeFinished: true
                                        }}
                                    >
                                        {#if new RegExp('^.*\.(jpg|JPG|gif|GIF|jpeg|JPEG|png|PNG|TIFF|tiff|TIF|tif)$').test(items.fileType)}
                                            <div class="img-outer-frame">
                                                <div class={`loading ${items.fileLoadStatus ? '' : 'active'}`}>{$i18n.t('loadingPhoto')}</div>
                                                <div class="img-outer">
                                                    <div class="img-frame">
                                                        <img
                                                            on:load={(event) => whenLoadImg(items.fileName,event)} 
                                                            src={`${API_URL}/preview?f=${btoa(encodeURIComponent(items.fileUrl))}`} 
                                                            alt="" 
                                                        />
                                                    </div>
                                                </div> 
                                            </div>
                                        {:else}
                                            <div class="icon"><FontAwesomeIcon icon={renderIcon(items.fileType)} /></div>
                                        {/if}
                                        <div class="file-name">{items.fileName}</div>
                                    </div>
                                {/if}
                            {/if}
                        {/each}
                    {:else}
                        {#if !rwdStatus}
                            <div class="no-data">{$i18n.t('noAnyFile')}</div>
                        {:else}
                            <div 
                                class="no-data"
                                on:touchstart={e => touchsEventObj = e }
                                on:press={() => showOptionList(touchsEventObj)}
                                use:press={{ 
                                    timeframe:1000,
                                    triggerBeforeFinished: true
                                }}
                            >{$i18n.t('noAnyFile')}</div>
                        {/if}
                    {/if}
                </div>
            {/if}
        </div>
        <div class={toggleOptionMenu ? "option-menu active" : "option-menu"} style={`top:${toggleOptionMenuXY.y}px;left:${toggleOptionMenuXY.x}px;`} >
            <div class="option-menu-list">
                {#each optionMenuItem as menuItem}
                    {#if menuItem.disabled}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div on:click={menuItem.useMethod} >{$i18n.t(menuItem.label)}</div>
                    {/if}
                {/each}
            </div>
        </div>
        <div class={toggleModal ? "modal-outer active" : "modal-outer"}>
            <div class="modal">
                <div class="modal-header">{$i18n.t(currentUseMethod === 'create' ? "modal.header.create" : "modal.header.rename", { type: haveExtendsName ? $i18n.t('modal.header.file') : $i18n.t('modal.header.folder') })}</div>
                <div class="modal-body">
                    <input type="text" bind:value={newDirName} />
                </div>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="modal-footer">
                    <div on:click={toggleModalStatus.bind(undefined,false,'confirm')}>{$i18n.t('modal.footer.confirm')}</div>
                    <div on:click={toggleModalStatus.bind(undefined,false,'cancel')}>{$i18n.t('modal.footer.cancel')}</div>
                </div>
            </div>
        </div>
        <div class={toggleDeleteModal ? "delete-modal-outer active" : "delete-modal-outer"}>
            <div class="modal">
                <div class="modal-header">{$i18n.t('deleteModal.header')}</div>
                <div class="modal-body">
                    <span>{$i18n.t('deleteModal.body',{ name:newDirName })}</span>
                </div>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="modal-footer">
                    <div on:click={toggleDeleteModalStatus.bind(undefined,false,'confirm')}>{$i18n.t('deleteModal.footer.confirm')}</div>
                    <div on:click={toggleDeleteModalStatus.bind(undefined,false,'cancel')}>{$i18n.t('deleteModal.footer.cancel')}</div>
                </div>
            </div>
        </div>
        <div class="language-list">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="language-name-outer" on:click={toggleLanguageListShow}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <line x1="48" y1="112" x2="336" y2="112" />
                    <line x1="192" y1="64" x2="192" y2="112" />
                    <polyline points="272 448 368 224 464 448" />
                    <line x1="301.5" y1="384" x2="434.5" y2="384" />
                    <path d="M281.3,112S257,206,199,277,80,384,80,384" />
                    <path d="M256,336s-35-27-72-75-56-85-56-85" />
                </svg>
                <div class="language-name">{languageOptionList[currentLanguage]}</div>
            </div>
            <div class="options-list-outer">
                <div class={toggleLanguageList ? 'options-list active' : 'options-list'}>
                    {#each Object.entries(languageOptionList) as item }
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div on:click={changeLanguage.bind(undefined,item[0])}>{item[1]}</div>
                    {/each}
                </div>
            </div>
        </div>
        <div class={`download-progress-bar-outer ${toggleDownloadModal ? 'active' : ''}`}>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="close-btn" on:click={() => toggleDownloadModal = false}>
                <FontAwesomeIcon icon={faTimes} />
            </div>
            <div class="download-title">
                <div>
                    <FontAwesomeIcon icon={faDownload} />
                </div>
                <div>
                    <span>{$i18n.t('downloadStatusGroup.downloadFileName')}：</span>
                    <span class={$i18n.language}>{fullFileName || 'no file'}</span>
                </div>
                <div>
                    {formatDateTime({ formatDate: donwloadRemainingTime * 1000, formatType: 'mm : ss' })}
                </div>
            </div>
            <div class="progress-outer">
                {downloadStatusItem[downloadStatusCode] ? $i18n.t(downloadStatusItem[downloadStatusCode]) : `${downloadPercentCount.toFixed(2)} %`}
                <div class="progress" style={`width: ${downloadPercentCount}%;opacity: ${(downloadPercentCount / 100).toFixed(2)};`}></div>
            </div>
        </div>
        <DragFrame fileIn={fileInStatus} />
        <Video 
            useMediaM3U8Path={mediaM3U8Path}
            closeAction={() => mediaM3U8Path = ''}
        />
    </div>
{/if}
<Loading loadingStatus={loadingStatus} />
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div 
    class={`input-modal-outer-frame 
    ${(!getLoccalSettingStatus && getLoccalSettingStatus !== undefined) || openLocalSettingModal ? 'active' : ''}
    `} 
    on:click={() => openLocalSettingModal = false}
>
    <div class="modal-outer">
        <div class="modal-header">{$i18n.t((!getLoccalSettingStatus && getLoccalSettingStatus !== undefined) ? 'inputModal.header' : 'inputModal.headerNotFirstTime')}</div>
        <div class="modal-body">
            <input type="text" class={getLoccalSettingStatus ? 'without-bottom' : ''} bind:value={createUploadPath}>
            {#if !getLoccalSettingStatus}
                <div>{$i18n.t('inputModal.body')}</div>
            {/if}
        </div>
        <div class="modal-footer">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="setting-btn" on:click={settingEvent}>{$i18n.t('inputModal.footerBtn')}</div>
        </div>
    </div>
</div>
<div class="footer">
    <h6>{$i18n.t('copyRight')}</h6>
</div>
<script lang="ts">
    interface foldersItemType{
        fileName:string,
        fileUrl:string,
        fileCreateTime:string,
        isFolder:boolean,
        fileType:string
        fileLoadStatus?: boolean
    }

    import './styles.scss'
    import { onMount,afterUpdate } from 'svelte'
    import { 
        faList,
        faGripHorizontal,
        faFolderClosed,
        faFileZipper,
        faFileLines,
        faImage,
        faFile,
        faArrowDownWideShort,
        faArrowUpShortWide,
        faAngleLeft,
        faQrcode,
        faFilm,
        faDownload,
        faTimes,
        faSync
    } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from 'fontawesome-svelte';
    import { press } from 'svelte-gestures';
    import { QRCodeImage } from "svelte-qrcode-image";
    import Tooltip from '../component/Tooltip.svelte'
    import Loading from '../component/Loading.svelte'
    import DragFrame from '../component/DragFrame.svelte';
    import Video from '../component/Video.svelte';
    import { i18n } from '../i18next'
    // import lib from '../lib/Library'
    
    // get server onload props
    let foldersItem:foldersItemType[] = []
    let currentDirEnv:string = ''
    let currentIp:string = ''
    const API_URL = process.env.API_URL
    let progressTxt:string = 'uploadStatus.ready'
    let count:number = -1
    let currentDirTemp:string = ""
    let toggleOptionMenu:boolean = false
    let toggleOptionMenuXY:{ x:number,y:number } = { x:0,y:0 }
    let toggleModal:boolean = false
    let toggleDeleteModal:boolean = false
    let newDirName:string = ""
    let oldDirName:string = ""
    let haveExtendsName:boolean = false
    let currentUseMethod:string = ""
    let fullFolderUrl:string = ""
    let fullFileName:string = ""
    let disabledDisplayOptionMenuItem:boolean = false
    let isDownload:boolean = false
    let listShortIcon:boolean = false
    let listDataDateSort:boolean = false
    let loadingStatus:boolean = false
    let fileInStatus:boolean = false
    let rwdStatus:boolean = false
    let optionMenuItem:{ 
        label:string,
        disabled:boolean
        useMethod:(event: MouseEvent & { currentTarget: EventTarget & HTMLDivElement; }) => void
    }[] = []
    let touchsEventObj:TouchEvent
    let isUpload:boolean = false
    let toggleLanguageList:boolean = false
    let currentLanguage:string = 'en'
    let mediaM3U8Path:string = ''
    let toggleDownloadModal:boolean = false
    let toggleChangeDownloadName:boolean = false
    let downloadStatusCode:number = 0
    let downloadPercentCount:number = 0
    let donwloadRemainingTime:number = 0
    let getLoccalSettingStatus: boolean | undefined = undefined
    let createUploadPath:string = ''
    let isLocalService: boolean = false
    let openLocalSettingModal: boolean = false
    const downloadStatusItem: Record<number,string> = {
        [downloadStatusCode]: '',
        0: 'downloadStatusGroup.prepareDownload',
        4: 'downloadStatusGroup.convertFile', 
        5: 'downloadStatusGroup.done'
    }
    const languageOptionList:{[key:string]:string} = {
        en:'English (en-US)',
        zh:'繁體中文 (zh-TW)'
    }

    afterUpdate(() => {
        document.querySelector('.app')?.classList[!getLoccalSettingStatus ? 'add' : 'remove']('disable')

        document.title = $i18n.t('webTitle')
    })

    $:{ // reactive change disabled status
        optionMenuItem = [{
            label:'optionMenuItem.previewImg',
            disabled: new RegExp('^.*\.(jpg|JPG|gif|GIF|jpeg|JPEG|png|PNG|TIFF|tiff|TIF|tif)$').test(fullFolderUrl),
            useMethod:():void => previewMedia(fullFolderUrl,true)
        },{
            label:'optionMenuItem.previewVideo',
            disabled: new RegExp('^.*\.(mp4|MP4|mkv|MKV|mpeg|MPEG|mov|MOV)$').test(fullFolderUrl),
            useMethod:():void => previewMedia(fullFolderUrl,false)
        },{
            label:'optionMenuItem.newFolder',
            disabled: true,
            useMethod:():void => toggleModalStatus(true,'create_label') 
        },{
            label:'optionMenuItem.rename',
            disabled: disabledDisplayOptionMenuItem,
            useMethod:():void => toggleModalStatus(true,'rename_label') 
        },{
            label:'optionMenuItem.delete',
            disabled: disabledDisplayOptionMenuItem,
            useMethod:():void => toggleDeleteModalStatus(true,'open')
        },{
            label:'optionMenuItem.download',
            disabled: isDownload,
            useMethod:():Promise<void> => downloadFile(fullFolderUrl)
        }]

        $i18n.changeLanguage(currentLanguage)
    }

    const toggleLanguageListShow:() => void = () => toggleLanguageList = !toggleLanguageList

    const changeLanguage:(lang:string) => void = lang => {
        currentLanguage = lang

        localStorage.setItem('lang',lang)

        toggleLanguageList = false
    }

    const formatDateTime = (format:{
        formatDate: string | globalThis.Date | number
        formatType: string
        toROCYear?: boolean
        localCountryTime?: number}
    ) => {

        const localCountryTime: number = ('localCountryTime' in format ? format.localCountryTime ?? 0 : 8) * 60 * 60 * 1000
        const dateStr: string = new Date(typeof format.formatDate === 'number' ? format.formatDate : +new Date(format.formatDate) + localCountryTime).toJSON()
        const dateSplit = dateStr.replace(/T/g, '-').replace(/:/g, '-').replace(/\./g, '-').replace(/Z/g, '').split('-')
        const [yearTemp, month, date, hour, minute, second, milliSecond] = dateSplit

        const year = format?.toROCYear ? (parseInt(yearTemp) - 1911).toString() : yearTemp // 更新方法 2023/03/08
        return format.formatType.replace(/yyyy/g, year).replace(/MM/g, month).replace(/dd/g, date).replace(/HH/g, hour).replace(/mm/g, minute).replace(/ss/g, second).replace(/ms/g, milliSecond)
    }

    const shortDate:() => void = () => {
        listDataDateSort = !listDataDateSort

        foldersItem = foldersItem.sort((a:foldersItemType,b:foldersItemType) => {
           return listDataDateSort ? +new Date(b.fileCreateTime) - +new Date(a.fileCreateTime) : +new Date(a.fileCreateTime) - +new Date(b.fileCreateTime) 
        })
    }

    const whenLoadImg:(fileName: string,{ target }:Event) => any = (fileName,{ target }) => {
        const findIndex = foldersItem.findIndex(row => row.fileName === fileName)
        foldersItem[findIndex].fileLoadStatus = true
    }

    // render icon in file-list-short
    const renderIcon:(type:string) => any = type => {
        const filterImg = '^.*\.(jpg|JPG|gif|GIF|jpeg|JPEG|png|PNG|tiff|TIF|TIFF)$'
        const filterFolder = '^.*\.(folder)$'
        const filterZip = '^.*\.(rar|zip)$'
        const filterTxt = '^.*\.(txt)$'
        const filterVideo = '^.*\.(mp4|MP4|mkv|MKV|mpeg|MPEG|mov|MOV)$'

        if(new RegExp(filterImg).test(type)) return faImage
        if(new RegExp(filterFolder).test(type)) return faFolderClosed
        if(new RegExp(filterZip).test(type)) return faFileZipper
        if(new RegExp(filterTxt).test(type)) return faFileLines
        if(new RegExp(filterVideo).test(type)) return faFilm

        return faFile
    }

    // create、rename modal
    const toggleModalStatus:(status:boolean,method:string) => void = (status,method) => {
        
        if(method.includes('label')) currentUseMethod = method.split('_')[0]

        if(currentUseMethod === 'create' && method !== 'confirm') newDirName = ''

        toggleModal = status

        if(method === 'confirm'){
            if(currentUseMethod === 'create'){
                fetch(`${API_URL}/api/create_dir`,{
                    method:'post',
                    headers:{ "Content-Type":"application/json" },
                    body:JSON.stringify({ folderName:newDirName,folderUrl:currentDirTemp || currentDirEnv })
                }).then(res => res.json()).then(() => {
                    newDirName = ''
                    currentUseMethod = ''
                    getUploadDirs(currentDirTemp)
                }).catch(err => console.log(err))
            }
            
            if(currentUseMethod === 'rename'){
                fetch(`${API_URL}/api/rename_dir`,{
                    method:'post',
                    headers:{ "Content-Type":"application/json" },
                    body:JSON.stringify({ oldFolderName:oldDirName, newFolderName:newDirName,folderUrl:currentDirTemp || currentDirEnv })
                }).then(res => res.json()).then(() => {
                    newDirName = ''
                    currentUseMethod = ''
                    oldDirName = ''
                    getUploadDirs(currentDirTemp)
                }).catch(err => console.log(err))
            }
        }

        if(method === 'cancel'){
            newDirName = ''
            oldDirName = ''
        }
    }

    const toggleDeleteModalStatus:(status:boolean,method:string) => void = (status,method) => {
        if(method === 'confirm'){
            deleteFile(fullFolderUrl)
        }

        toggleDeleteModal = status
    }

    const dragenter:(e:DragEvent) => void = e => {
        e.stopPropagation();
        e.preventDefault();
    }
    
    const dragover:(e:DragEvent) => void = e => {
        e.stopPropagation();
        e.preventDefault();
        fileInStatus = true
    }
    
    const drop:(e:DragEvent) => void = e => {
        e.stopPropagation();
        e.preventDefault();

        const files = e.dataTransfer!.files!;
        files[0] && uploadFile(files);

        fileInStatus = false
    }

    const inputUploadEvent:(e:Event) => void = e => {
        const files = (e.target as HTMLInputElement).files!
        uploadFile(files);
        (e.target as HTMLInputElement).value = '';
    }

    // upload file
    const uploadFile:(filesList:FileList) => void = filesList => {
        const formData = new FormData()
        formData.append('folderUrl',currentDirTemp || currentDirEnv);

        Array.from(filesList).forEach((files:any) => formData.append('files',files))
        
        count = -1
        isUpload = true
        progressTxt = 'uploadStatus.uploading'

        const xhr = new XMLHttpRequest()
        xhr.open('post',`${API_URL}/api/upload_file`,true)

        // if uploaed
        xhr.onreadystatechange = function(){
            if(this.readyState == 4) {
                const { message }:{ message:string } = JSON.parse(this.responseText)
                progressTxt = message
                isUpload = false
                getUploadDirs(currentDirTemp)
            }
        }

        // for uploading progress bar
        xhr.upload.onprogress = function(pr:ProgressEvent<EventTarget>){
            if(pr.lengthComputable){
                const uploadPercent = 100 * pr.loaded / pr.total
                count = uploadPercent
            }
        }

        xhr.send(formData)
    }

    // download file
    const downloadFile:(url:string) => Promise<void> = async url => {

        const [fileDetails] = foldersItem.filter(row => row.fileUrl === url)

        if(!fileDetails) return

        fullFileName = fileDetails.fileName
        
        const startTime = new Date().getTime();

        toggleChangeDownloadName = true
        toggleDownloadModal = true
        downloadPercentCount = 0
        downloadStatusCode = 0
        donwloadRemainingTime = 0

        const resp = await fetch(`${API_URL}/download?f=${btoa(encodeURIComponent(url))}`)
        const contentLength = resp.headers.get('content-length');
        const total = parseInt(contentLength!, 10);
        let loaded = 0;

        const reader = resp.body!.getReader();

        downloadStatusCode = 2

        const stream = new ReadableStream({
            start: async controller => {
                const read:() => Promise<void> = async () => {
                    const { done, value } = await reader.read()
                    
                    if (done) {
                        controller.close();
                        downloadStatusCode = 4
                        return;
                    }

                    loaded += value.byteLength;
                    const downloadPercent = (loaded / total) * 100;
                    downloadPercentCount = downloadPercent

                    const currentTime = new Date().getTime();
                    const elapsedTime = (currentTime - startTime) / 1000; // pasting time seconds
                    const downloadSpeed = loaded / elapsedTime; // download Speed
                    donwloadRemainingTime = (total - loaded) / downloadSpeed; // remaining time seconds

                    controller.enqueue(value);

                    await read();
                }

                await read();
            }
        });

        const blob = await new Response(stream).blob();
        const createUrl = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = createUrl;
        a.download = fileDetails.fileName
        document.body.appendChild(a);

        a.click();

        URL.revokeObjectURL(createUrl)
        document.body.removeChild(a)

        downloadStatusCode = 5
        toggleChangeDownloadName = false
    }

    const previewMedia:(url:string,isImg: boolean) => void = (url,isImg) => {
        if(isImg){
            window.open(`${API_URL}/preview?f=${btoa(encodeURIComponent(url))}`)
            return
        }

        fetch(`${API_URL}/api/convert?f=${btoa(encodeURIComponent(url))}`)
            .then(res => res.json())
            .then(async res => {
                if(res.message === 'success'){
                    mediaM3U8Path = `${API_URL}${atob(decodeURIComponent(res.result))}`
                }
            })
            .catch(err => console.log(err))
    }

    // delete file
    const deleteFile:(folderUrl:string) => void = folderUrl => {
        loadingStatus = true

        fetch(`${API_URL}/api/delete_file`,{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({ folderUrl })
        }).then(res => res.json()).then(res => {
            toggleOptionMenu = false
            loadingStatus = false
            getUploadDirs(currentDirTemp)
        }).catch(err => alert(err))
    }

    // go dictionary
    const cdDictionary:(url:string) => void = url => {
        loadingStatus = true
        currentDirTemp = currentDirEnv !== url ? url : ''

        fetch(`${API_URL}/api/cd_dir`,{
            method:'post',
            headers:{ 'Content-Type':'application/json' },
            body:JSON.stringify({ dir:url })
        }).then(res => res.json()).then((res:any) => {
            foldersItem = res.data
            loadingStatus = false
        }).catch(err => {
            loadingStatus = false
            console.log(err)
        })
    }

    // change current dictionary
    const actionDictionary:() => void = () => {
        if (currentDirTemp === '') {
            cdDictionary(currentDirEnv)
            return
        }

        const splitPath = currentDirTemp.replace(/[\\//]/g, '|').split('|')
        
        const currentDirTempRef = currentDirTemp.replace(/[\\//]/g, '|').split('|')[splitPath.length - 1]

        currentDirTemp = currentDirTemp.replace(`\\${currentDirTempRef}`,'')

        cdDictionary(currentDirTemp)
    }

    // get upload dictionary
    const getUploadDirs:(path:string) => void = path => {
        loadingStatus = true

        fetch(`${API_URL}/api/get_upload_dirs`,{
            method:'post',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({ folderUrl:path || currentDirEnv })
        })
        .then(resDir => resDir.json())
        .then(resDir => {
            foldersItem = resDir.data
            loadingStatus = false
        })
        .catch(err => console.log(err))
    }

    // show option menu when click right on mouse
    const showOptionList:(e:any) => void = e => {
        if(e){
            if((e.target as HTMLDivElement).nodeName === 'A') return

            if(!['upload','prev-btn'].includes((e.target as HTMLDivElement).className)){
                !rwdStatus && e.preventDefault()

                disabledDisplayOptionMenuItem = false

                if(['no-touch','no-data','file-list-short','file-frame'].includes((e.target as HTMLDivElement).className)){
                    isDownload = false
                } else if(['file-list-item-folder','folder file-name'].includes((e.target as HTMLDivElement).className)){
                    disabledDisplayOptionMenuItem = true
                    isDownload = false
                } else if(['file-list-item','file-name'].includes((e.target as HTMLDivElement).className)){
                    disabledDisplayOptionMenuItem = true
                    isDownload = true
                }

                const pe = e as PointerEvent

                if(pe.pointerType === 'mouse'){
                    if(pe.button === 2){
                        toggleOptionMenu = true
                        toggleOptionMenuXY.x = pe.pageX
                        toggleOptionMenuXY.y = pe.pageY

                        if(['file-list-item-folder','file-list-item','file-name','folder file-name'].includes((pe.target as HTMLDivElement).className)){
                            if(listShortIcon){
                                newDirName = ((pe.target as HTMLDivElement).children[1] as HTMLDivElement).innerText.split('\n')[0]!
                                oldDirName = ((pe.target as HTMLDivElement).children[1] as HTMLDivElement).innerText.split('\n')[0]!
                            } else {
                                newDirName = (pe.target as HTMLDivElement).innerText.split('\n')[0]!
                                oldDirName = (pe.target as HTMLDivElement).innerText.split('\n')[0]!
                            }

                            const [,newExtendsName] = newDirName.split('.')

                            haveExtendsName = newExtendsName !== undefined

                            const [matchFiles] = foldersItem.filter(item => item.fileName === newDirName)

                            if(!matchFiles) return

                            fullFolderUrl = matchFiles.fileUrl
                        }

                    } else {
                        toggleOptionMenu = false
                    }
                } else {
                    const te = e as TouchEvent

                    if(te.targetTouches){
                        toggleOptionMenu = true
                        toggleOptionMenuXY.x = te.targetTouches.item(0)!.pageX
                        toggleOptionMenuXY.y = te.targetTouches.item(0)!.pageY
                        

                        if(['file-list-item-folder','file-list-item','file-name','folder file-name'].includes((te.target as HTMLDivElement).className)){
                            const element = (te.target as HTMLDivElement);
                            
                            if(listShortIcon){
                                newDirName = (element.children[1] as HTMLDivElement).innerText.split('\n')[0]!
                                oldDirName = (element.children[1] as HTMLDivElement).innerText.split('\n')[0]!
                            } else {
                                newDirName = (element.children[0].children[1] as HTMLDivElement).innerText
                                oldDirName = (element.children[0].children[1] as HTMLDivElement).innerText
                            }

                            const [,newExtendsName] = newDirName.split('.')

                            haveExtendsName = newExtendsName !== undefined

                            const [matchFiles] = foldersItem.filter(item => item.fileName === newDirName)

                            if(!matchFiles) return

                            fullFolderUrl = matchFiles.fileUrl
                        }
                    }
                }
            }
        }
    }

    const settingEvent:() => Promise<void> = async () => {
        
        if(createUploadPath){
            const resultI = await fetch(`${API_URL}/api/create_setting`,{ 
                method:'post',
                headers:{ "Content-Type":"application/json" },
                body:JSON.stringify({ u:btoa(encodeURIComponent(createUploadPath)) }) 
            })

            const resultI_Item = await resultI.json()

            if(resultI_Item.message !== 'success') return

            await initFetch()

            getLoccalSettingStatus = true

            openLocalSettingModal = false
        }
    }

    const initFetch:() => Promise<void> = async () => {
        const resFirst = await fetch(`${API_URL}/api/check_setting_exist`)
        const resFirstItem = await resFirst.json()

        if(resFirstItem.message === 'empty'){
            getLoccalSettingStatus = false
            return
        }

        const res = await fetch(`${API_URL}/api/get_upload_dirs`,{ method:'post',headers:{ "Content-Type":"application/json" },body:JSON.stringify({ folderUrl:'' }) })
        const resItem = await res.json()

        const resIp = await fetch(`${API_URL}/api/get_remote_ip`)
        const resIpItem = await resIp.json()

        getLoccalSettingStatus = true

        foldersItem = resItem.data,
        currentDirEnv = resItem.useFolderUrl
        currentIp = resIpItem.currentIp
        isLocalService = resIpItem.isLocal
        createUploadPath = resItem.useFolderUrl
    }

    onMount(async () => {
        rwdStatus = window.innerWidth <= 420

        !rwdStatus && document.addEventListener('contextmenu',showOptionList);
        !rwdStatus && document.addEventListener('click',showOptionList)
        document.addEventListener('dragenter',dragenter)
        document.addEventListener('dragover',dragover)
        document.addEventListener('drop',drop)
        document.addEventListener('dragleave',() => fileInStatus = false)
        document.addEventListener('touchstart',(e) => {
            const matchRuleTextGorup:string[] = [
                'New Folder','Rename','Delete','Download','Preview Image','Preview Video',
                '新增資料夾','重新命名','刪除','下載','預覽圖片','預覽影片'
            ]

            if(!matchRuleTextGorup.includes((e.target as HTMLDivElement).textContent!)) toggleOptionMenu =false
        })

        if(localStorage.getItem('lang')) {
            changeLanguage(localStorage.getItem('lang')!)
        } else {
            const [lang,] = navigator.language.split('-')
            changeLanguage(lang)
        }

        await initFetch()
    })
    
</script>

