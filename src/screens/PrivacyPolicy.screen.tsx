import { View, Text, ScrollView } from "react-native";
import React from "react";
import ScreenHeader from "../components/ScreenHeader";
import { useNavigation } from "@react-navigation/native";

type Props = {};

const PrivacyPolicy = (props: Props) => {
  const navgiation = useNavigation();
  return (
    <View className="flex-1">
      <ScreenHeader backFn={navgiation.goBack} name="حریم خصوصی" />
      <ScrollView className="rtl px-4">
        <Text className="text-black font-[IRANSansBold]">
          سیاست حفظ اطلاعات و محرمانگی اطلاعات کاربران در زیپ وی
        </Text>
        <Text className="text-gray-700 font-[IRANSansMedium]">
          سیاست حفظ اطلاعات و محرمانگی اطلاعات کاربران در زیپ وی زیپ وی معتقد
          است اصول حفظ حریم شخصی و اطلاعات کاربران بسیار مهم و حساس است. در این
          سند اصول محرمانگی اطلاعات زیپ وی و نیز راهکارهای زیپ وی برای حفظ حریم
          شخصی و اطلاعات کاربران برنامه زیپ وی توضیح داده شده است.
        </Text>
        <Text className="text-black font-[IRANSansBold]">محتویات این سند</Text>
        <Text className="text-gray-700 font-[IRANSansMedium]">
          این سند شامل توضیحی درباره اطلاعات خصوصی ای است که زیپ وی از کاربران
          برنامه جمع آوری می کند و نیز نحوه استفاده زیپ وی از این اطلاعات. این
          اطلاعات شامل مواردی است که مخصوص هر کاربر بوده و به کمک آن ها می توان
          کاربران زیپ وی را به صورت منحصر به فرد شناسایی نمود. برای نمونه می
          توان به نام، نشانی، نشانی الکترونیک (ایمیل)، شماره تلفن و سایر
          اطلاعاتی که به صورت عادی در دسترس عموم مردم نیست اشاره نمود. این سند
          به مواردی که در اختیار زیپ وی نیست و زیپ وی هیچ کنترلی بر آن ها ندارد
          نمی پردازد. شرکت های مشتری خدمات زیپ وی و افراد ثالثی که در استخدام
          زیپ وی نیستند از جمله این موارد هستند.
        </Text>
        <Text className="text-black font-[IRANSansBold]">
          اطلاعات جمع آوری شده و نحوه استفاده از آن ها
        </Text>
        <Text className="text-gray-700 font-[IRANSansMedium]">
          شما با ثبت نام و استفاده از خدمات برنامه زیپ وی اطلاعات خصوصی خود از
          قبیل نام، نشانی، نشانی الکترونیک، شماره تماس و … را در اختیار زیپ وی
          قرار می دهید. پس از ورود به برنامه زیپ وی شما یک کاربر ناشناخته نیستید
          و اطلاعات مربوط به استفاده شما از خدمات زیپ وی نگهداری می گردد. این
          اطلاعات شامل اطلاعات مربوط به موقعیت جغرافیایی فعلی، سرویسهای مورد
          استفاده، اطلاعات فردی و مانند آن بوده ولی محدود به این موارد نیست. زیپ
          وی به صورت خودکار پس از ورود شما به برنامه زیپ وی اطلاعاتی از قبیل IP
          شما، اطلاعات کوکی های زیپ وی و صفحاتی که مشاهده می کنید را جمع آوری و
          نگهداری می کند. زیپ وی از این اطلاعات در راستای بعضی از مقاصد از قبیل
          ارتقاء خدمات زیپ وی،بهبود سرویس های ارائه شده، تهیه محتوای مناسب،
          برنامه های تبلیغاتی و مانند آن استفاده می کند. زیپ وی اطلاعات شما را
          اجاره نمی دهد، نمی فروشد و به اشتراک نمی گذارد به جز در موارد زیر: در
          صورت ادغام زیپ وی در یک شرکت دیگر. در این حالت قبل از به اشتراک گذاری
          اطلاعات شما، این موضوع به شما اطلاع داده شده و نظر شما را درباره ادامه
          استفاده از خدمات زیپ وی یا خروج کامل پرسیده می شود. در صورت تخطی شما
          از قوانین شرایط و ضوابط سرویسها ، و در صورت وجود شاکی خصوصی نسبت به
          عملکرد شما، اطلاعات شما در اختیار مراجع قانونی قرار می گیرد. در صورتی
          که مراجع قضایی اطلاعات شما را –به هر دلیلی- از زیپ وی بخواهند این
          اطلاعات در اختیار ایشان قرار می گیرد. زیپ وی ممکن است بر روی تلفن
          همراه شما کوکی ذخیره کرده و در مراجعات بعدی شما به برنامه زیپ وی از آن
          استفاده کند.
        </Text>
        <Text className="text-black font-[IRANSansBold]">
          محدودیت دسترسی به اطلاعات
        </Text>
        <Text className="text-gray-700 font-[IRANSansMedium]">
          زیپ وی دسترسی کارمندان خود به اطلاعات شما را محدود نموده و فقط
          کارمندانی که مستقیماً باید برای ارایه خدمات زیپ وی یا انجام وظایف خود
          در این راستا با شما در تماس باشند به این اطلاعات دسترسی دارند. زیپ وی
          جهت حفظ امنیت اطلاعات محرمانه، ممکن است اطلاعات مهم مثل رمز عبور و …
          را به صورت رمز شده در پایگاه های داده خود ذخیره کند به نوعی که در صورت
          دسترسی ناخواسته و غیر مجاز به آن ها، این اطلاعات قابل استفاده توسط
          دیگران نباشد؛ اگر چه نمیتوانیم هیچ تضمینی در این رابطه به شما بدهیم.
          امیدواریم كه بتوانیم به شما این تضمین را بدهیم كه از اطلاعات شخصی تان
          تحت بالاترین استانداردهای امنیتی استفاده خواهد شد. زیپ وی تلاش خواهد
          كرد كه تمامی راه های معقول را طی كند تا امنیت هر نوع اطلاعاتی را كه از
          شما در اختیار دارد،‌ حفظ كند. همچنین اطلاعات شخصی شما در شبكه های امنی
          ذخیره می شوند اما متاسفانه،‌ با وجود فناوری فوق و ادوات امنیتی، نمی
          توان ایمنی هیچ مخابره داده ای از طریق اینترنت را به صورت %100 تضمین
          كرد. بنابراین ما نمی توانیم این اطمینان را به صورت قطعی بدهیم كه
          اطلاعاتی كه برای ما می فرستید،‌ در حین ارسال (مخابره) در هر شرایطی در
          امان خواهند بود و علاوه بر آن نمی توانیم مسئولیت اتفاقات ناشی از
          دسترسی غیر قانونی به اطلاعات شخصی شما را قبول كنیم. (همانند دسترسی ISP
          ها به اطلاعات ارسالی از رایانه شما) زیپ وی مسئولیت عواقب ناشی از
          دستیابی غیر قانونی شخص یا گروه ثالثی به اطلاعات شخصی شما را نیز نخواهد
          پذیرفت.
        </Text>
        <Text className="text-black font-[IRANSansBold]">
          اطلاعات تماس با زیپ وی
        </Text>
        <Text className="text-gray-700 font-[IRANSansMedium]">
          ایمیل:‌zipwaySupp@gmail.com
        </Text>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicy;
