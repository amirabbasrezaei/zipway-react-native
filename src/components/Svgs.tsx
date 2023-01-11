import classNames from "classnames";
import Svg, { G, Path, SvgXml } from "react-native-svg";

interface SvgType {
  classStyle?: string;
}

export const ArrowLeftIcon = ({ classStyle }: SvgType) => (
  <Svg className={classStyle} viewBox="0 0 448 512">
    <Path d="M448.004 256C448.004 264.844 440.848 272 432.004 272H68.174L203.848 421.25C209.785 427.781 209.301 437.906 202.77 443.844C199.707 446.625 195.848 448 192.004 448C187.66 448 183.316 446.25 180.16 442.75L20.16 266.75C14.613 260.656 14.613 251.344 20.16 245.25L180.16 69.25C186.129 62.688 196.254 62.25 202.77 68.156C209.301 74.094 209.785 84.219 203.848 90.75L68.174 240H432.004C440.848 240 448.004 247.156 448.004 256Z" />
  </Svg>
);
export const UserLocationIcon = ({ classStyle }: SvgType) => (
  <Svg
    className={classStyle}
    viewBox="0 0 48 48"
  >
    <Path d="M0 0h48v48h-48z" fill="none" />
    <Path d="M24 16c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm17.88 6c-.92-8.34-7.54-14.96-15.88-15.88v-4.12h-4v4.12c-8.34.92-14.96 7.54-15.88 15.88h-4.12v4h4.12c.92 8.34 7.54 14.96 15.88 15.88v4.12h4v-4.12c8.34-.92 14.96-7.54 15.88-15.88h4.12v-4h-4.12zm-17.88 16c-7.73 0-14-6.27-14-14s6.27-14 14-14 14 6.27 14 14-6.27 14-14 14z" />
  </Svg>
);

export const OriginLocationIcon = ({ classStyle }: SvgType) => (
  <Svg  className={classStyle} viewBox="0 0 384 512">
    <Path d="M192 0C85.969 0 0 85.969 0 192.001C0 269.408 26.969 291.033 172.281 501.676C181.813 515.441 202.188 515.441 211.719 501.676C357.031 291.033 384 269.408 384 192.001C384 85.969 298.031 0 192 0ZM192 271.998C147.875 271.998 112 236.123 112 191.998S147.875 111.997 192 111.997S272 147.872 272 191.998S236.125 271.998 192 271.998Z" />
  </Svg>
);

export const LocationMarkerIcon = ({ classStyle }: SvgType) => (
<Svg  className={classStyle} viewBox="0 0 24 24" ><G id="info"/><Path d="M12,0C7,0,3,4,3,9c0,6.2,3.4,11.7,8.5,14.9c0.3,0.2,0.7,0.2,1.1,0C17.6,20.6,21,15.2,21,9C21,4,17,0,12,0z M12,13   c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4s4,1.8,4,4C16,11.2,14.2,13,12,13z" id="pin"/></Svg>
);


export const XMarkIcon = ({ classStyle }: SvgType) => (
  <Svg className={classStyle} viewBox="0 0 320 512">
    <Path d="M315.31 411.31C309.056 417.563 298.936 417.563 292.682 411.31L160 278.627L27.318 411.31C21.064 417.563 10.944 417.563 4.69 411.31C-1.563 405.056 -1.563 394.936 4.69 388.682L137.373 256L4.69 123.318C-1.563 117.064 -1.563 106.944 4.69 100.69C10.944 94.437 21.064 94.437 27.318 100.69L160 233.373L292.682 100.69C298.936 94.437 309.056 94.437 315.31 100.69C321.563 106.944 321.563 117.064 315.31 123.318L182.627 256L315.31 388.682C321.563 394.936 321.563 405.056 315.31 411.31Z" />
  </Svg>
);

export const ArrowRightIcon = ({ classStyle }: SvgType) => (
  <Svg className={classStyle} viewBox="0 0 448 512">
    <Path d="M427.844 266.75L267.844 442.75C264.688 446.25 260.344 448 256 448C252.156 448 248.297 446.625 245.234 443.844C238.703 437.906 238.219 427.781 244.156 421.25L379.83 272H16C7.156 272 0 264.844 0 256S7.156 240 16 240H379.83L244.156 90.75C238.219 84.219 238.703 74.094 245.234 68.156C251.781 62.25 261.891 62.688 267.844 69.25L427.844 245.25C433.391 251.344 433.391 260.656 427.844 266.75Z" />
  </Svg>
);
export const SettingsIcon = ({ classStyle }: SvgType) => (
  <Svg className={classStyle} viewBox="0 0 512 512">
    <Path d="M504.265 315.978C504.265 307.326 499.658 299.134 491.906 294.586L458.998 275.615C459.643 269.099 459.966 262.549 459.966 256S459.643 242.901 458.998 236.385L491.906 217.414C499.658 212.866 504.265 204.674 504.265 196.022C504.265 174.755 454.947 67.846 419.746 67.846C415.502 67.846 411.236 68.939 407.379 71.203L374.599 90.172C363.888 82.43 352.533 75.848 340.531 70.428V32.488C340.531 21.262 333.047 11.453 322.205 8.613C300.654 2.871 278.425 0 256.181 0C233.935 0 211.675 2.871 190.06 8.613C179.218 11.453 171.734 21.262 171.734 32.488V70.428C159.732 75.848 148.377 82.43 137.666 90.172L104.886 71.203C101.031 68.939 96.763 67.846 92.519 67.846C92.517 67.846 92.514 67.846 92.512 67.846C60.048 67.846 8 169.591 8 196.022C8 204.674 12.607 212.866 20.359 217.414L53.267 236.385C52.622 242.901 52.299 249.451 52.299 256S52.622 269.099 53.267 275.615L20.359 294.586C12.607 299.134 8 307.326 8 315.978C8 337.245 57.318 444.154 92.519 444.154C96.763 444.154 101.029 443.061 104.886 440.797L137.666 421.828C148.377 429.57 159.732 436.152 171.734 441.572V479.512C171.734 490.738 179.218 500.547 190.06 503.387C211.611 509.129 233.84 512 256.084 512C278.33 512 300.59 509.129 322.205 503.387C333.047 500.547 340.531 490.738 340.531 479.512V441.572C352.533 436.152 363.888 429.57 374.599 421.828L407.379 440.797C411.234 443.061 415.502 444.154 419.746 444.154C452.209 444.154 504.265 342.423 504.265 315.978ZM415.361 389.959C391.561 376.186 404.101 383.444 371.705 364.695C329.649 395.09 339.375 389.426 292.531 410.582V460.82C279.236 463.161 266.948 464 256.093 464C240.669 464 228.14 462.306 219.734 460.824V410.582C172.779 389.376 182.552 395.044 140.56 364.695C108.748 383.105 117.896 377.811 96.924 389.949C81.181 371.256 68.849 349.895 60.517 326.84C81.643 314.663 72.361 320.014 104.088 301.723C101.549 276.083 100.277 266.079 100.277 256.04C100.277 246.018 101.545 235.96 104.088 210.277C72.198 191.892 81.571 197.295 60.504 185.152C68.818 162.109 81.187 140.686 96.904 122.041C120.704 135.814 108.164 128.556 140.56 147.305C182.616 116.91 172.89 122.574 219.734 101.418V51.18C233.029 48.839 245.318 48 256.172 48C271.597 48 284.126 49.694 292.531 51.176V101.418C339.486 122.624 329.713 116.956 371.705 147.305C405.655 127.657 394.228 134.27 415.343 122.051C431.084 140.744 443.416 162.105 451.748 185.16C430.622 197.337 439.904 191.986 408.177 210.277C410.716 235.917 411.988 245.921 411.988 255.96C411.988 265.982 410.72 276.04 408.177 301.723C440.067 320.108 430.694 314.705 451.761 326.848C443.447 349.891 431.078 371.314 415.361 389.959ZM256.133 160C203.258 160 160.133 203.125 160.133 256S203.258 352 256.133 352S352.133 308.875 352.133 256S309.008 160 256.133 160ZM256.133 304C229.666 304 208.133 282.467 208.133 256S229.666 208 256.133 208S304.133 229.533 304.133 256S282.599 304 256.133 304Z "></Path>
  </Svg>
);

export const EllipsisIcon = ({ classStyle }: SvgType) => (
  <Svg className={classStyle} viewBox="0 0 128 512">
    <Path d="M64 112C90.5 112 112 90.5 112 64S90.5 16 64 16S16 37.5 16 64S37.5 112 64 112ZM64 400C37.5 400 16 421.5 16 448S37.5 496 64 496S112 474.5 112 448S90.5 400 64 400ZM64 208C37.5 208 16 229.5 16 256S37.5 304 64 304S112 282.5 112 256S90.5 208 64 208Z" />
  </Svg>
);

export const LoadingSpinner = ({ classStyle }: SvgType) => (
  <Svg
    aria-hidden="true"
    className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
    viewBox="0 0 100 101"
    fill="none"
  >
    <Path
      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
      fill="currentColor"
    />
    <Path
      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      fill="#000"
    />
  </Svg>
);

export const SnappTextIcon = ({ classStyle }: SvgType) => {
  const xml = `<svg   viewBox="0 0 90 26">
  <g fill="none" fill-rule="evenodd">
      <g fill="#00D170">
          <g>
              <path d="M12.948 3.06c-.621 1.212-2.016 1.803-3.32 1.416-.438-.13-.894-.2-1.356-.2-.938 0-2.188.547-2.188 1.643 0 1.146 1.38 1.59 2.265 1.877l1.303.39c2.734.81 4.844 2.19 4.844 5.372 0 1.955-.47 3.962-2.032 5.292-1.536 1.304-3.594 1.851-5.573 1.851-2.464 0-4.876-.828-6.877-2.225-.013-.01-.018-.028-.01-.043l2.173-4.093c1.277 1.121 2.787 2.033 4.532 2.033 1.198 0 2.473-.6 2.473-1.981 0-1.434-2.004-1.93-3.098-2.242C2.88 11.237.77 10.403.77 6.596.77 2.607 3.61 0 7.542 0c1.969 0 4.375.62 6.118 1.6.015.01.022.029.013.046l-.725 1.415zM20.18 8.526h.001c.011 0 .022-.006.028-.015 1.092-1.605 2.418-2.15 4.261-2.15 3.593 0 5.026 2.269 5.026 5.554v5.44c0 1.56-1.263 2.825-2.822 2.825H24.79c-.019 0-.034-.015-.034-.034v-6.484c0-1.278.209-3.52-2.135-3.52-1.928 0-2.474 1.434-2.474 3.103v4.11c0 1.56-1.263 2.825-2.822 2.825H15.44c-.018 0-.033-.015-.033-.034V6.838c0-.018.015-.033.033-.033h4.673c.019 0 .034.015.034.033v1.654c0 .019.015.034.034.034M35.291 13.505c0 1.695 1.12 2.999 3.047 2.999 1.928 0 3.048-1.304 3.048-2.999 0-1.642-1.12-3.024-3.048-3.024-1.927 0-3.047 1.382-3.047 3.024m7.856 6.675h-1.884c-.019 0-.033-.015-.033-.034v-1.418c0-.02-.016-.034-.034-.034-.012 0-.023.006-.029.015-.836 1.32-2.47 1.914-4.026 1.914-3.959 0-6.745-3.311-6.745-7.144 0-3.832 2.734-7.118 6.692-7.118 1.507 0 3.088.552 4.082 1.679.02.023.06.01.06-.022v-1.18c0-.018.014-.033.033-.033h4.673c.018 0 .033.015.033.033v10.517c0 1.56-1.263 2.825-2.822 2.825M52.002 13.505c0 1.695 1.12 2.999 3.047 2.999s3.047-1.304 3.047-2.999c0-1.642-1.12-3.024-3.047-3.024-1.928 0-3.047 1.382-3.047 3.024m.19-5.188c.01 0 .022-.006.028-.015.862-1.32 2.47-1.94 4.027-1.94 3.985 0 6.745 3.337 6.745 7.17 0 3.858-2.734 7.091-6.693 7.091-1.533 0-3.117-.545-4.133-1.712-.003-.003-.007-.001-.007.003v4.082c0 1.56-1.264 2.825-2.822 2.825h-1.918V6.805h4.74v1.478c0 .02.014.034.033.034M68.461 13.505c0 1.695 1.12 2.999 3.047 2.999s3.048-1.304 3.048-2.999c0-1.642-1.121-3.024-3.048-3.024-1.928 0-3.047 1.382-3.047 3.024m.19-5.188c.011 0 .022-.006.028-.015.862-1.32 2.47-1.94 4.027-1.94 3.984 0 6.744 3.337 6.744 7.17 0 3.858-2.734 7.091-6.692 7.091-1.507 0-3.065-.526-4.082-1.654-.02-.023-.06-.009-.06.022v4.005c0 1.56-1.262 2.825-2.82 2.825H63.91c-.018 0-.034-.016-.034-.034V6.838c0-.018.016-.033.034-.033h4.672c.02 0 .034.015.034.033v1.445c0 .02.015.034.033.034M84.997.522l-3.212 12.35h2.67c1.292 0 2.42-.876 2.744-2.129L89.862.522h-4.865zM83.387 14.618c1.655 0 2.999 1.345 2.999 3.002 0 1.657-1.344 3.002-3 3.002-1.654 0-2.998-1.345-2.998-3.002 0-1.657 1.344-3.002 2.999-3.002z" transform="translate(-214 -43) translate(214 43)"/>
          </g>
      </g>
  </g>
</svg>
`;
  return <SvgXml className={classStyle} xml={xml} />;
};
