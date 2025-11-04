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
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div class="change-path-btn" onclick={() => openLocalSettingModal = true}>
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
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div 
                    class={currentDirTemp ? "prev-btn active" : "prev-btn"}
                    onclick={actionDictionary}
                >
                    <FontAwesomeIcon icon={faAngleLeft} />
                    <Tooltip pos={{ x: currentLanguage === 'en' ? -68 : -33,y:-67 }} width={currentLanguage === 'en' ? 150 : 80}>{$i18n.t('prevFolder')}</Tooltip>
                </div>
                <div class={isUpload ? 'upload-btn disactive' : 'upload-btn'}>
                    {$i18n.t('uploadBtn')}
                    <input type="file" title="" disabled={isUpload} class='upload' onchange={inputUploadEvent} multiple={true} />
                </div>
                <div class="upload-progress-bar">
                    <div class={!['uploadStatus.uploading','uploadStatus.ready'].includes(progressTxt) ? 'upload-progress-bar-inner active' : 'upload-progress-bar-inner'} style="width:{count === -1 ? 0 : count}%;"></div>
                    <div class="progress-text">{['uploadStatus.ready'].includes(progressTxt) ? $i18n.t(progressTxt) : `${$i18n.t(progressTxt)} `}{count !== -1 ? `${Math.floor(count)} %` : ''}</div>
                </div>
                <div class="fn-group">
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div class={listShortIcon ? "fn active" : "fn"} onclick={() => listShortIcon = true}>
                        <FontAwesomeIcon icon={faGripHorizontal} />
                        <Tooltip pos={{ x:0,y:-40 }} width={70}>{$i18n.t('shortList')}</Tooltip>
                    </div>
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div class={!listShortIcon ? "fn active" : "fn"} onclick={() => listShortIcon = false}>
                        <FontAwesomeIcon icon={faList} />
                        <Tooltip pos={{ x:0,y:-40 }} width={70}>{$i18n.t('detailList')}</Tooltip>
                    </div>
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div class="fn" onclick={shortDate}>
                        <FontAwesomeIcon icon={listDataDateSort ? faArrowUpShortWide : faArrowDownWideShort} />
                        <Tooltip pos={{ x:0,y:-40 }} width={115}>{$i18n.t(listDataDateSort ? "sortLateDate" : "sortLatestDate")}</Tooltip>
                    </div>
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
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div 
                        class={currentDirTemp ? "prev-btn active" : "prev-btn"}
                        onclick={actionDictionary}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </div>
                    <div class={isUpload ? 'upload-btn disactive' : 'upload-btn'}>
                        {$i18n.t('uploadBtn')}
                        <input type="file" title="" disabled={isUpload} class='upload' onchange={inputUploadEvent} multiple={true} />
                    </div>
                </div>
                <div class="upload-progress-bar">
                    <div class={!['uploadStatus.uploading','uploadStatus.ready'].includes(progressTxt) ? 'upload-progress-bar-inner active' : 'upload-progress-bar-inner'} style="width:{count === -1 ? 0 : count}%;"></div>
                    <div class="progress-text">{['uploadStatus.ready'].includes(progressTxt) ? $i18n.t(progressTxt) : `${$i18n.t(progressTxt)} `}{count !== -1 ? `${Math.floor(count)} %` : ''}</div>
                </div>
                <div class="fn-group">
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div class={listShortIcon ? "fn active" : "fn"} onclick={() => listShortIcon = true}>
                        <FontAwesomeIcon icon={faGripHorizontal} />
                    </div>
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div class={!listShortIcon ? "fn active" : "fn"} onclick={() => listShortIcon = false}>
                        <FontAwesomeIcon icon={faList} />
                    </div>
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div class="fn" onclick={shortDate}>
                        <FontAwesomeIcon icon={listDataDateSort ? faArrowUpShortWide : faArrowDownWideShort} />
                    </div>
                </div>
            </div>
        {/if}
        <div 
            class="file-list-outer"
            ontouchstart={e => touchsEventObj = e }
            {...usePress(
                () => showOptionList(touchsEventObj),
                () => ({
                    timeframe: 1000,
                    triggerBeforeFinished: true 
                })
            )}
        >
            {#if !listShortIcon}
                <div class="file-list">
                    {#if foldersItem.length > 0}
                        {#each foldersItem as items}
                            <div class="file-list-item">
                                {#if items.isFolder}
                                    {#if !rwdStatus}
                                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                                        <div
                                            onclick={cdDictionary.bind(undefined,items.fileUrl)}
                                            class="folder file-name" 
                                        >
                                            <span><FontAwesomeIcon icon={renderIcon(items.fileType)} />{items.fileName}</span>
                                            <span>{lib.formatDateTime({ formatDate: items.fileCreateTime, formatType: 'yyyy-MM-dd HH:mm:ss' })}</span>
                                        </div>
                                    {:else}
                                        <div
                                            onclick={cdDictionary.bind(undefined,items.fileUrl)}
                                            ontouchstart={e => touchsEventObj = e }
                                            {...usePress(
                                                () => showOptionList(touchsEventObj),
                                                () => ({
                                                    timeframe: 1000,
                                                    triggerBeforeFinished: true 
                                                })
                                            )}
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
                                            <span>{lib.formatDateTime({ formatDate: items.fileCreateTime, formatType: 'yyyy-MM-dd HH:mm:ss' })}</span>
                                        </div>
                                    {:else}
                                        <div 
                                            class="file-name"
                                            ontouchstart={e => touchsEventObj = e }
                                            {...usePress(
                                                () => showOptionList(touchsEventObj),
                                                () => ({
                                                    timeframe: 1000,
                                                    triggerBeforeFinished: true 
                                                })
                                            )}
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
                                ontouchstart={(e) => touchsEventObj = e }
                                {...usePress(
                                    () => showOptionList(touchsEventObj),
                                    () => ({
                                        timeframe: 1000,
                                        triggerBeforeFinished: true 
                                    })
                                )}
                                
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
                                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                                    <div class="file-list-item-folder"onclick={cdDictionary.bind(undefined,items.fileUrl)}>
                                        <div class="icon"><FontAwesomeIcon icon={renderIcon(items.fileType)} /></div>
                                        <div class="folder file-name" >{items.fileName}</div>
                                    </div>
                                {:else}
                                    <div class="file-list-item-folder"
                                        onclick={cdDictionary.bind(undefined,items.fileUrl)}
                                        ontouchstart={e => touchsEventObj = e }
                                        {...usePress(
                                            () => showOptionList(touchsEventObj),
                                            () => ({
                                                timeframe: 1000,
                                                triggerBeforeFinished: true 
                                            })
                                        )}
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
                                                            onload={whenLoadImg.bind(undefined, items.fileName)} 
                                                            src={`${API_URL}/preview?f=${btoa(encodeURIComponent(items.fileUrl))}&scale=1`} 
                                                            alt="" 
                                                        />
                                                        <div class="inside-icon"><FontAwesomeIcon icon={renderIcon(items.fileType)} /></div>
                                                    </div>
                                                </div> 
                                            </div>
                                        {:else if new RegExp('^.*\.(mp4|MP4|mkv|MKV|mpeg|MPEG|mov|MOV)$').test(items.fileType)}
                                            <div class="img-outer-frame">
                                                <div class={`loading ${items.fileLoadStatus ? '' : 'active'}`}>{$i18n.t('loadingVideoPreview')}</div>
                                                <div class="img-outer">
                                                    <div class="img-frame">
                                                        <img
                                                            onload={whenLoadImg.bind(undefined, items.fileName)} 
                                                            src={`${API_URL}/api/preview_v?f=${btoa(encodeURIComponent(items.fileUrl))}`} 
                                                            alt="" 
                                                        />
                                                        <div class="inside-icon"><FontAwesomeIcon icon={renderIcon(items.fileType)} /></div>
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
                                        ontouchstart={e => touchsEventObj = e }
                                        {...usePress(
                                            () => showOptionList(touchsEventObj),
                                            () => ({
                                                timeframe: 1000,
                                                triggerBeforeFinished: true 
                                            })
                                        )}
                                    >
                                        {#if new RegExp('^.*\.(jpg|JPG|gif|GIF|jpeg|JPEG|png|PNG|TIFF|tiff|TIF|tif)$').test(items.fileType)}
                                            <div class="img-outer-frame">
                                                <div class={`loading ${items.fileLoadStatus ? '' : 'active'}`}>{$i18n.t('loadingPhoto')}</div>
                                                <div class="img-outer">
                                                    <div class="img-frame">
                                                        <img
                                                            onload={whenLoadImg.bind(undefined, items.fileName)} 
                                                            src={`${API_URL}/preview?f=${btoa(encodeURIComponent(items.fileUrl))}`} 
                                                            alt="" 
                                                        />
                                                        <div class="inside-icon"><FontAwesomeIcon icon={renderIcon(items.fileType)} /></div>
                                                    </div>
                                                </div> 
                                            </div>
                                        {:else if new RegExp('^.*\.(mp4|MP4|mkv|MKV|mpeg|MPEG|mov|MOV)$').test(items.fileType)}
                                            <div class="img-outer-frame">
                                                <div class={`loading ${items.fileLoadStatus ? '' : 'active'}`}>{$i18n.t('loadingVideoPreview')}</div>
                                                <div class="img-outer">
                                                    <div class="img-frame">
                                                        <img
                                                            onload={whenLoadImg.bind(undefined, items.fileName)} 
                                                            src={`${API_URL}/api/preview_v?f=${btoa(encodeURIComponent(items.fileUrl))}`} 
                                                            alt="" 
                                                        />
                                                        <div class="inside-icon"><FontAwesomeIcon icon={renderIcon(items.fileType)} /></div>
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
                                ontouchstart={e => touchsEventObj = e }
                                {...usePress(
                                    () => showOptionList(touchsEventObj),
                                    () => ({
                                        timeframe: 1000,
                                        triggerBeforeFinished: true 
                                    })
                                )}
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
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        <div onclick={menuItem.useMethod}>{$i18n.t(menuItem.label)}</div>
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
                <div class="modal-footer">
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div onclick={toggleModalStatus.bind(undefined,false,'confirm')}>{$i18n.t('modal.footer.confirm')}</div>
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div onclick={toggleModalStatus.bind(undefined,false,'cancel')}>{$i18n.t('modal.footer.cancel')}</div>
                </div>
            </div>
        </div>
        <div class={toggleDeleteModal ? "delete-modal-outer active" : "delete-modal-outer"}>
            <div class="modal">
                <div class="modal-header">{$i18n.t('deleteModal.header')}</div>
                <div class="modal-body">
                    <span>{$i18n.t('deleteModal.body',{ name:newDirName })}</span>
                </div>
                <div class="modal-footer">
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div onclick={toggleDeleteModalStatus.bind(undefined,false,'confirm')}>{$i18n.t('deleteModal.footer.confirm')}</div>
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div onclick={toggleDeleteModalStatus.bind(undefined,false,'cancel')}>{$i18n.t('deleteModal.footer.cancel')}</div>
                </div>
            </div>
        </div>
        <div class="language-list">
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div class="language-name-outer" onclick={toggleLanguageListShow}>
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
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        <div onclick={changeLanguage.bind(undefined, item[0])}>{item[1]}</div>
                    {/each}
                </div>
            </div>
        </div>
        <div class={`download-progress-bar-outer ${toggleDownloadModal ? 'active' : ''}`}>
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <!-- <div class="close-btn" onclick={() => toggleDownloadModal = false}>
                <FontAwesomeIcon icon={faTimes} />
            </div> -->
            <div class="download-title">
                <div>
                    <FontAwesomeIcon icon={faDownload} />
                </div>
                <div>
                    <span>{$i18n.t('downloadStatusGroup.downloadFileName')}：</span>
                    <span class={$i18n.language}>{fullFileName || 'no file'}</span>
                </div>
                <div>
                    {lib.formatDateTime({ formatDate: donwloadRemainingTime * 1000, formatType: 'mm : ss' })}
                </div>
            </div>
            <div class="progress-outer">
                {downloadStatusItem[downloadStatusCode] ? $i18n.t(downloadStatusItem[downloadStatusCode]) : `${downloadPercentCount.toFixed(2)} % (${downloadSpeed})`}
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
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div 
    class={`input-modal-outer-frame 
    ${(!getLoccalSettingStatus && getLoccalSettingStatus !== undefined) || openLocalSettingModal ? 'active' : ''}
    `} 
    onclick={(e) => {
        if((e.target as HTMLDivElement).className.includes('input-modal-outer-frame')) openLocalSettingModal = false
    }}
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
            <div class="setting-btn" onclick={settingEvent}>{$i18n.t('inputModal.footerBtn')}</div>
        </div>
    </div>
</div>
<div class={`video-convert-time-alert-outer ${toggleVideoConverTimesModal ? 'toggle' : ''} ${toggleVideoConverTimesModalToMin ? 'to-min' : ''}`}>
    <div class="alert-body">
        <!-- mark place -->
        <div class="mask-back">
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div class="to-min-btn" onclick={() => toggleVideoConverTimesModalToMin = true}>
                <FontAwesomeIcon icon={faAngleDown} />
            </div> 
            <div class="title">{$i18n.t('videoConverting.title')}</div>
            <div class="convert-progress-bar">
                <div class={videoConverTimes.percent === 100 ? 'convert-progress-bar-inner active' : 'convert-progress-bar-inner'} style="width:{videoConverTimes.percent === -1 ? 0 : videoConverTimes.percent}%;"></div>
                <div class="progress-text">{`${videoConverTimes.percent === 100 ? $i18n.t('videoConverting.progressProccesingDoneText') : $i18n.t('videoConverting.progressProccesingText', { percent: videoConverTimes.percent.toFixed(2) })}`}</div>
            </div>
            <div class="convert-remain-time">{$i18n.t('videoConverting.progressRemainingTime', { minute: videoConverTimes.remainTime.mins, seconds: videoConverTimes.remainTime.secs })}</div>
        </div>
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="mask-front" onclick={() => toggleVideoConverTimesModalToMin = false}>
            <div class="icon">
                <FontAwesomeIcon icon={faFilm} />
            </div>
            <div class="convert-progress-bar">
                <div class={videoConverTimes.percent === 100 ? 'convert-progress-bar-inner active' : 'convert-progress-bar-inner'} style="width:{videoConverTimes.percent === -1 ? 0 : videoConverTimes.percent}%;"></div>
            </div>
        </div>
    </div>
</div>
<div class="footer">
    <h6>{$i18n.t('copyRight')}</h6>
</div>
<Toast toastMessages={toastMessages} duration={1800} />
<Loading loadingStatus={loadingStatus} />

<script lang="ts">
    import './styles.scss'
    import { onMount } from 'svelte'
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
        faSync,
        faAngleDown
    } from '@fortawesome/free-solid-svg-icons';
    import FontAwesomeIcon from 'svelte-fa';
    import { usePress } from 'svelte-gestures';
    import { QRCodeImage } from "svelte-qrcode-image";
    import Tooltip from '../component/Tooltip.svelte'
    import Loading from '../component/Loading.svelte'
    import DragFrame from '../component/DragFrame.svelte';
    import Video from '../component/Video.svelte';
    import Toast from '../component/Toast.svelte'
    import { i18n } from '../i18next'
    import langs from '../assert/json/lang.json'
    import lib from '../lib/Library'
    
    // get server onload props
    let foldersItem = $state<foldersItemType[]>([])
    let currentDirEnv = $state<string>('')
    let currentIp = $state<string>('')
    const API_URL = process.env.API_URL
    let progressTxt = $state<string>('uploadStatus.ready')
    let count = $state<number>(-1)
    let currentDirTemp = $state<string>("")
    let toggleOptionMenu = $state<boolean>(false)
    let toggleOptionMenuXY:{ x:number, y:number } = { x:0, y:0 }
    let toggleModal = $state<boolean>(false)
    let toggleDeleteModal = $state<boolean>(false)
    let newDirName = $state<string>("")
    let oldDirName = $state<string>("")
    let haveExtendsName = $state<boolean>(false)
    let currentUseMethod = $state<string>("")
    let fullFolderUrl = $state<string>("")
    let fullFileName = $state<string>("")
    let disabledDisplayOptionMenuItem = $state<boolean>(false)
    let isDownload = $state<boolean>(false)
    let listShortIcon = $state<boolean>(false)
    let listDataDateSort = $state<boolean>(false)
    let loadingStatus = $state<boolean>(false)
    let fileInStatus = $state<boolean>(false)
    let rwdStatus = $state<boolean>(false)
    let optionMenuItem = $state<{ label:string, disabled:boolean, useMethod(): any }[]>([])
    let touchsEventObj = $state<TouchEvent | undefined>(undefined)
    let isUpload = $state<boolean>(false)
    let toggleLanguageList = $state<boolean>(false)
    let currentLanguage = $state<string>('en')
    let mediaM3U8Path = $state<string>('')
    let toggleDownloadModal = $state<boolean>(false)
    let downloadStatusCode = $state<number>(0)
    let downloadPercentCount = $state<number>(0)
    let donwloadRemainingTime = $state<number>(0)
    let downloadSpeed = $state<string>('')
    let getLoccalSettingStatus = $state<boolean | undefined>(undefined)
    let createUploadPath = $state<string>('')
    let isLocalService = $state<boolean>(false)
    let openLocalSettingModal = $state<boolean>(false)
    let toggleVideoConverTimesModal = $state<boolean>(false)
    let toggleVideoConverTimesModalToMin = $state<boolean>(false)
    let videoConverTimes = $state<{ percent: number, remainTime: { mins: number, secs: number } }>({ percent: -1, remainTime: { mins: 0, secs: 0 } })
    let toastMessages = $state<{ message: string, status: 'success' | 'error' | 'info' }>({ message: '', status: 'success' })
    const downloadStatusItem: Record<number,string> = {
        [downloadStatusCode]: '',
        0: 'downloadStatusGroup.prepareDownload',
        4: 'downloadStatusGroup.convertFile', 
        5: 'downloadStatusGroup.done'
    }
    const languageOptionList: Record<string, string> = langs

    $effect(() => {
        document.querySelector('.app')?.classList[!getLoccalSettingStatus ? 'add' : 'remove']('disable')

        document.title = $i18n.t('webTitle')

        optionMenuItem = [{
            label:'optionMenuItem.previewImg',
            disabled: new RegExp('^.*\.(jpg|JPG|gif|GIF|jpeg|JPEG|png|PNG|TIFF|tiff|TIF|tif)$').test(fullFolderUrl),
            useMethod: previewMedia.bind(undefined, fullFolderUrl, true)
        },{
            label:'optionMenuItem.previewVideo',
            disabled: new RegExp('^.*\.(mp4|MP4|mkv|MKV|mpeg|MPEG|mov|MOV)$').test(fullFolderUrl),
            useMethod: previewMedia.bind(undefined, fullFolderUrl, false)
        },{
            label:'optionMenuItem.previewDoc',
            disabled: new RegExp('^.*\.(txt)$').test(fullFolderUrl),
            useMethod: previewDoc.bind(undefined, fullFolderUrl)
        }, {
            label:'optionMenuItem.newFolder',
            disabled: !disabledDisplayOptionMenuItem,
            useMethod: toggleModalStatus.bind(undefined, true, 'create_label') 
        },{
            label:'optionMenuItem.rename',
            disabled: disabledDisplayOptionMenuItem,
            useMethod: toggleModalStatus.bind(undefined, true, 'rename_label') 
        },{
            label:'optionMenuItem.delete',
            disabled: disabledDisplayOptionMenuItem,
            useMethod: toggleDeleteModalStatus.bind(undefined, true, 'open')
        },{
            label:'optionMenuItem.download',
            disabled: isDownload,
            useMethod: downloadFile.bind(undefined, fullFolderUrl)
        }]
    })

    const toggleLanguageListShow:() => void = () => toggleLanguageList = !toggleLanguageList

    const changeLanguage:(lang: string) => void = lang => {
        currentLanguage = lang

        localStorage.setItem('lang',lang)

        toggleLanguageList = false

        $i18n.changeLanguage(lang)
    }

    const shortDate:() => void = () => {
        listDataDateSort = !listDataDateSort

        foldersItem = lib.sort(foldersItem, (a, b) => {
           return listDataDateSort ? +new Date(b.fileCreateTime) - +new Date(a.fileCreateTime) : +new Date(a.fileCreateTime) - +new Date(b.fileCreateTime) 
        })
    }

    const formatVideoRemainTime:(seconds: number) => { mins: number, secs: number } = seconds => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return { mins, secs }
    }

    const formatSpeed:(bytesPerSecond: number) => string = bytesPerSecond => {
        
        if (bytesPerSecond < 1024 * 1024) {
            return `${(bytesPerSecond / 1024).toFixed(2)} KB/s`;
        }

        return `${(bytesPerSecond / (1024 * 1024)).toFixed(2)} MB/s`;
    }

    const whenLoadImg:(fileName: string) => any = fileName => {
        const findIndex = lib.findIndexOfObj(foldersItem, row => row.fileName === fileName)
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
    const toggleModalStatus:(status: boolean, method: string) => Promise<void> = async (status, method) => {
        
        if(method.includes('label')) currentUseMethod = method.split('_')[0]

        if(currentUseMethod === 'create' && method !== 'confirm') newDirName = ''

        toggleModal = status

        if(method === 'confirm'){

            if(currentUseMethod === 'create'){

                await lib.fetch.post(`${API_URL}/api/create_dir`, {
                    headers: { "Content-Type":"application/json" },
                    data: { folderName:newDirName,folderUrl: btoa(encodeURIComponent(currentDirTemp || currentDirEnv)) }
                })

                newDirName = ''
                currentUseMethod = ''
                getUploadDirs(currentDirTemp)
            }
            
            if(currentUseMethod === 'rename'){

                await lib.fetch.post(`${API_URL}/api/rename`, {
                    headers: { "Content-Type":"application/json" },
                    data: { 
                        oldName:oldDirName, 
                        newName:newDirName, 
                        url: btoa(encodeURIComponent(currentDirTemp || currentDirEnv)) 
                    }
                })

                newDirName = ''
                currentUseMethod = ''
                oldDirName = ''
                getUploadDirs(currentDirTemp)
            }
        }

        if(method === 'cancel'){
            newDirName = ''
            oldDirName = ''
        }
    }

    const toggleDeleteModalStatus:(status: boolean, method: string) => Promise<void> = async (status,method) => {
        if(method === 'confirm') await deleteFile(fullFolderUrl)
        toggleDeleteModal = status
    }

    const dragenter:(e: DragEvent) => void = e => {
        e.stopPropagation();
        e.preventDefault();
    }
    
    const dragover:(e: DragEvent) => void = e => {
        e.stopPropagation();
        e.preventDefault();
        fileInStatus = true
    }
    
    const drop:(e: DragEvent) => void = e => {
        e.stopPropagation();
        e.preventDefault();

        const files = e.dataTransfer!.files!;
        files[0] && uploadFile(files);

        fileInStatus = false
    }

    const inputUploadEvent:(e: Event) => void = e => {
        const files = (e.target as HTMLInputElement).files!
        uploadFile(files);
        lib.typeFix<HTMLInputElement>(e.target).value = '';
    }

    // upload file
    const uploadFile:(filesList: FileList) => void = filesList => {
        const formData = new FormData()
        formData.append('folderUrl',currentDirTemp || currentDirEnv);

        lib.each(lib.createArray<File, FileList>({ type: 'new', item: filesList }), files => formData.append('files',files))
        
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

        const [fileDetails] = lib.filter(foldersItem, row => row.fileUrl === url)

        if(!fileDetails) return

        fullFileName = fileDetails.fileName
        
        const startTime = new Date().getTime();

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
                    const downloadSpeedTemp = loaded / elapsedTime; // download Speed

                    donwloadRemainingTime = (total - loaded) / downloadSpeedTemp; // remaining time seconds
                    downloadSpeed = formatSpeed(downloadSpeedTemp)

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
        a.download = fullFileName
        lib('.app').appendDom(a)
        a.click();

        URL.revokeObjectURL(createUrl)
        lib('.app').removeChildDom(a)

        downloadStatusCode = 5
        toggleDownloadModal = false
        toastMessages = { message: $i18n.t('downloadStatusGroup.doneMsg', { fileName: fullFileName }), status: 'success' }
    }

    const previewMedia:(url:string,isImg: boolean) => Promise<void> = async (url,isImg) => {
        
        if(isImg){
            window.open(`${API_URL}/preview?f=${btoa(encodeURIComponent(url))}&full=1`)
            return
        }

        loadingStatus = true

        const res = await lib.fetch.get<{ message: string, result: Record<string, any> | string }>(`${API_URL}/api/is_convert_exsited?f=${btoa(encodeURIComponent(url))}`)
        
        if(res.data.message === 'is_converting') {
            toastMessages = { message: $i18n.t('toastMsg.whenConverting', { fileName: (res.data.result as Record<string, any>).fileName }), status: 'info' }
            loadingStatus = false
            return
        }

        if(res.data.message === 'not_exsited') {

            const evtSource = new EventSource(`${API_URL}/api/convert?f=${btoa(encodeURIComponent(url))}`);
            
            evtSource.onmessage = e => {

                const data = JSON.parse(e.data as unknown as string) as any;

                if(data.message === 'start_convert') loadingStatus = false

                if(data.message === 'progress') {

                    toggleVideoConverTimesModal = true

                    const { convertPer, remaining } =  data.result as { convertPer: string, remaining: number }
                    
                    const { mins, secs } = formatVideoRemainTime(remaining)
                    
                    videoConverTimes = {
                        ...videoConverTimes,
                        percent: parseFloat(convertPer),
                        remainTime: { mins, secs }
                    }
                }

                if (data.message === 'success') {

                    toastMessages = { message: $i18n.t('toastMsg.videoConverted', { fileName: data.result.fileName }), status: 'success' }

                    if(toggleVideoConverTimesModal) {

                        toggleVideoConverTimesModal = false

                        if(toggleVideoConverTimesModalToMin) toggleVideoConverTimesModalToMin = false

                        videoConverTimes = { percent: -1, remainTime: { mins: 0, secs: 0 } }
                    }

                    evtSource.close();
                }
            }

            return
        }

        if (res.data.message === 'success') {

            loadingStatus = false

            mediaM3U8Path = `${API_URL}${atob(decodeURIComponent(res.data.result as string))}`
        }
    }

    const previewDoc: (url:string) => Promise<void> = async url => {
        window.open(`${API_URL}/preview_doc?f=${btoa(encodeURIComponent(url))}`)
    }

    // delete file
    const deleteFile:(folderUrl:string) => Promise<void> = async folderUrl => {
        
        loadingStatus = true

        await lib.fetch.post(`${API_URL}/api/delete_file`, {
            headers: { "Content-Type":"application/json" },
            data: { url: btoa(encodeURIComponent(folderUrl)) }
        })

        toggleOptionMenu = false
        loadingStatus = false
        getUploadDirs(currentDirTemp)
    }

    // go dictionary
    const cdDictionary:(url:string) => Promise<void> = async url => {
        loadingStatus = true
        currentDirTemp = currentDirEnv !== url ? url : ''

        foldersItem = []

        const result = await lib.fetch.post<{ data: foldersItemType[] }>(`${API_URL}/api/cd_dir`, {
            headers: { "Content-Type":"application/json" },
            data: { dir: btoa(encodeURIComponent(url)) }
        })

        foldersItem = result.data.data
        loadingStatus = false
    }

    // change current dictionary
    const actionDictionary:() => Promise<void> = async () => {
        if (currentDirTemp === '') {
            await cdDictionary(currentDirEnv)
            return
        }

        const splitPath = currentDirTemp.replace(/[\\//]/g, '|').split('|')
        
        const currentDirTempRef = currentDirTemp.replace(/[\\//]/g, '|').split('|')[splitPath.length - 1]

        currentDirTemp = currentDirTemp.replace(`\\${currentDirTempRef}`,'')

        cdDictionary(currentDirTemp)
    }

    // get upload dictionary
    const getUploadDirs:(path:string) => Promise<void> = async path => {
        
        loadingStatus = true

        const result = await lib.fetch.post<{ data: foldersItemType[] }>(`${API_URL}/api/get_upload_dirs`, {
            headers: { "Content-Type":"application/json" },
            data: { folderUrl: btoa(encodeURIComponent(path || currentDirEnv)) }
        })

        foldersItem = result.data.data
        loadingStatus = false
    }

    // show option menu when click right on mouse
    const showOptionList:(e:any) => void = e => {
        
        if(e){

            // prevent dynamic auto download not working
            if(lib.typeFix<HTMLDivElement>(e.target).nodeName === 'A') return

            if(!lib.includes(['upload','prev-btn'], lib.typeFix<HTMLDivElement>(e.target).className)){
                !rwdStatus && e.preventDefault()

                disabledDisplayOptionMenuItem = false

                if(lib.includes(['no-touch','no-data','file-list-short','file-list-outer', 'file-frame'], lib.typeFix<HTMLDivElement>(e.target).className)){
                    isDownload = false
                } else if(lib.includes(['file-list-item-folder','folder file-name'], lib.typeFix<HTMLDivElement>(e.target).className)){
                    disabledDisplayOptionMenuItem = true
                    isDownload = false
                } else if(lib.includes(['file-list-item','file-name'], lib.typeFix<HTMLDivElement>(e.target).className)){
                    disabledDisplayOptionMenuItem = true
                    isDownload = true
                }

                const pe = lib.typeFix<PointerEvent>(e) 

                if(pe instanceof MouseEvent){

                    if(pe.button === 2){
                        toggleOptionMenu = true
                        toggleOptionMenuXY.x = pe.pageX
                        toggleOptionMenuXY.y = pe.pageY

                        if(lib.includes(['file-list-item-folder','file-list-item','file-name','folder file-name'], lib.typeFix<HTMLDivElement>(pe.target).className)){
                            
                            const element = lib.typeFix<HTMLDivElement>(pe.target);

                            if(listShortIcon){
                                newDirName = lib.typeFix<HTMLDivElement>(element.children[1]).innerText.split('\n')[0]!
                                oldDirName = lib.typeFix<HTMLDivElement>(element.children[1]).innerText.split('\n')[0]!
                            } else {
                                const isSafari = new RegExp(/(?=.*apple)/i).test(navigator.vendor.toLowerCase())

                                newDirName = element.innerText.split('\n')[isSafari ? 1 : 0]!
                                oldDirName = element.innerText.split('\n')[isSafari ? 1 : 0]!
                            }

                            const [,newExtendsName] = newDirName.split('.')

                            haveExtendsName = newExtendsName !== undefined

                            const [matchFiles] = lib.filter(foldersItem, item => item.fileName === newDirName)

                            if(!matchFiles) return

                            fullFolderUrl = matchFiles.fileUrl
                        }

                        if(lib.includes(['file-list-short','file-list-outer', 'file-frame'], lib.typeFix<HTMLDivElement>(e.target).className)) {
                            fullFolderUrl = currentDirTemp || currentDirEnv
                        }

                    } else {
                        toggleOptionMenu = false
                    }

                } else {
                    const te = lib.typeFix<TouchEvent>(e)
                    
                    if(te.targetTouches){
                        toggleOptionMenu = true
                        toggleOptionMenuXY.x = te.targetTouches.item(0)!.pageX + 20
                        toggleOptionMenuXY.y = te.targetTouches.item(0)!.pageY

                        if(lib.includes(['file-list-item-folder','file-list-item','file-name','folder file-name'], lib.typeFix<HTMLDivElement>(te.target).className)){
                            const element = lib.typeFix<HTMLDivElement>(te.target);
                            
                            if(listShortIcon){
                                newDirName = lib.typeFix<HTMLDivElement>(element.children[1]).innerText.split('\n')[0]!
                                oldDirName = lib.typeFix<HTMLDivElement>(element.children[1]).innerText.split('\n')[0]!
                            } else {
                                newDirName = lib.typeFix<HTMLDivElement>(element.children[0].children[1]).innerText
                                oldDirName = lib.typeFix<HTMLDivElement>(element.children[0].children[1]).innerText
                            }

                            const [,newExtendsName] = newDirName.split('.')

                            haveExtendsName = newExtendsName !== undefined

                            const [matchFiles] = lib.filter(foldersItem, item => item.fileName === newDirName)

                            if(!matchFiles) return

                            fullFolderUrl = matchFiles.fileUrl
                        }

                        if(lib.includes(['file-list-short','file-list-outer', 'file-frame'], lib.typeFix<HTMLDivElement>(e.target).className)) {
                            fullFolderUrl = currentDirTemp || currentDirEnv
                        }
                    }
                }
            }
        }
    }

    const settingEvent:() => Promise<void> = async () => {
        
        if(createUploadPath){

            const result = await lib.fetch.post<{ message: string }>(`${API_URL}/api/create_setting`,{
                headers:{ "Content-Type":"application/json" },
                data: { u:btoa(encodeURIComponent(createUploadPath)) }
            })

            // const resultI_Item = await resultI.json()

            if(result.data.message !== 'success') return

            await initFetch()

            getLoccalSettingStatus = true

            openLocalSettingModal = false
        }
    }

    const initFetch:() => Promise<void> = async () => {

        const resCheckSettingExist = await lib.fetch.get<{ message: string }>(`${API_URL}/api/check_setting_exist`)
        // const resFirstItem = await resFirst.json()

        if(resCheckSettingExist.data.message === 'empty'){
            getLoccalSettingStatus = false
            return
        }

        const resGetUploadDirs = await lib.fetch.post<{ 
            data: foldersItemType[],
            useFolderUrl: string,
        }>(`${API_URL}/api/get_upload_dirs`,{
            headers:{ "Content-Type":"application/json" },
            data: { folderUrl:'' } 
        })

        // const resItem = await res.json()

        const resIp = await lib.fetch.get<{ currentIp: string, isLocal: boolean }>(`${API_URL}/api/get_remote_ip`)
        // const resIpItem = await resIp.json()

        getLoccalSettingStatus = true

        foldersItem = resGetUploadDirs.data.data,
        currentDirEnv = resGetUploadDirs.data.useFolderUrl
        currentIp = resIp.data.currentIp
        isLocalService = resIp.data.isLocal
        createUploadPath = resGetUploadDirs.data.useFolderUrl
    }

    onMount(async () => {
        rwdStatus = window.innerWidth <= 420

        !rwdStatus && lib(document).listener('contextmenu', showOptionList);
        !rwdStatus && lib(document).listener('click', showOptionList)
        lib(document).listener('dragenter', dragenter)
        lib(document).listener('dragover', dragover)
        lib(document).listener('drop', drop)
        lib(document).listener('dragleave',() => fileInStatus = false)
        lib(document).listener('touchstart',e => {
            
            const matchRuleTextGorup:string[] = [
                'New Folder','Rename','Delete','Download','Preview Image','Preview Video',
                '新增資料夾','重新命名','刪除','下載','預覽圖片','預覽影片'
            ]

            if(!lib.includes(matchRuleTextGorup, lib.typeFix<HTMLDivElement>(e.target).textContent)) toggleOptionMenu =false
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

