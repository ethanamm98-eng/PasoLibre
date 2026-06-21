module.exports=[18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},89523,e=>{"use strict";var t=e.i(47909),r=e.i(74017),a=e.i(96250),n=e.i(59756),o=e.i(61916),s=e.i(74677),i=e.i(69741),l=e.i(16795),d=e.i(87718),p=e.i(95169),c=e.i(47587),u=e.i(66012),g=e.i(70101),x=e.i(26937),f=e.i(10372),h=e.i(93695);e.i(52474);var b=e.i(5232),m=e.i(89171),v=e.i(46245);let y=e=>String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");async function R(e){try{let t=(()=>{let e=process.env.RESEND_API_KEY;if(!e)throw Error("Missing RESEND_API_KEY.");return new v.Resend(e)})(),r=await e.json(),a=String(r.email||"").trim().toLowerCase(),n=String(r.firstName||"").trim(),o=String(r.languagePreference||"en").trim().toLowerCase();if(!a||!n)return m.NextResponse.json({success:!1,message:"Missing email or firstName."},{status:400});let s="es"===o,i={subject:s?"Tu cuenta de Paso Libre ha sido aprobada":"Your Paso Libre Account Has Been Approved",banner:s?"Tu cuenta ha sido aprobada":"Your Account Has Been Approved",title:s?"¡Bienvenido(a) a Paso Libre!":"Welcome to Paso Libre!",greeting:s?`Hola ${y(n)},`:`Hi ${y(n)},`,approvalMessage:s?`Excelentes noticias: tu solicitud para unirte a <strong>Paso Libre</strong> ha sido aprobada.
       Tu cuenta ya est\xe1 activa y lista para usar.`:`Great news — your request to join <strong>Paso Libre</strong> has been approved.
       Your account is now active and ready to use.`,accountEmail:s?"Correo electrónico":"Account Email",status:s?"Estado":"Status",active:s?"Activo":"Active",loginMessage:s?"Haz clic en el botón a continuación para iniciar sesión y comenzar a explorar tu cuenta.":"Click the button below to sign in and start exploring your dashboard.",loginButton:s?"Iniciar sesión en Paso Libre":"Sign In to Paso Libre",footer:s?"Si tienes alguna pregunta, simplemente responde a este correo electrónico. Estaremos encantados de ayudarte.":"If you have any questions, just reply to this email — we’re happy to help.",rights:s?"Todos los derechos reservados.":"All rights reserved.",failedSend:s?"No se pudo enviar el correo de aprobación.":"Failed to send approval email.",unableSend:s?"No se pudo enviar el correo de aprobación.":"Unable to send approval email."},l=`
  <div style="margin:0;padding:0;background-color:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f3f4f6;">
      <tr>
        <td align="center" style="padding:40px 20px;">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.08);">
            <tr>
              <td style="padding:30px 40px;text-align:center;background:linear-gradient(90deg,#3b82f6,#1d4ed8);">
                <img src="https://wusbcaffjonhexqrabzk.supabase.co/storage/v1/object/public/email-assets/logo-title_nobg.png" alt="Paso Libre" width="320" style="display:block;margin:0 auto;height:auto;">
                <p style="margin:10px 0 0;font-size:12px;color:#dbeafe;">
                  ${i.banner}
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:32px 40px;">
                <h2 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#111827;">
                  ${i.title}
                </h2>

                <p style="margin:0 0 18px;font-size:14px;line-height:1.6;color:#4b5563;">
                  ${i.greeting}
                </p>

                <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#4b5563;">
                  ${i.approvalMessage}
                </p>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f9fafb;border-radius:12px;padding:16px;margin-bottom:24px;">
                  <tr>
                    <td style="padding:6px 0;font-size:13px;color:#374151;">
                      <strong>${i.accountEmail}:</strong> ${y(a)}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;font-size:13px;color:#374151;">
                      <strong>${i.status}:</strong> ${i.active}
                    </td>
                  </tr>
                </table>

                <p style="margin:0 0 26px;font-size:14px;line-height:1.6;color:#4b5563;">
                  ${i.loginMessage}
                </p>

                <div style="text-align:center;">
                  <a href="http://localhost:3000/login" target="_blank"
                    style="display:inline-block;padding:14px 40px;background:linear-gradient(90deg,#3b82f6,#1d4ed8);color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;border-radius:10px;">
                    ${i.loginButton}
                  </a>
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:24px 40px;text-align:center;background-color:#f3f4f6;border-top:1px solid #e5e7eb;">
                <p style="margin:0;font-size:11px;color:#6b7280;">
                  ${i.footer}
                </p>
                <p style="margin:6px 0 0;font-size:11px;color:#6b7280;">
                  \xa9 ${new Date().getFullYear()} Paso Libre. ${i.rights}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
`,{error:d}=await t.emails.send({from:process.env.EMAIL_FROM||"Paso Libre <team@pasolibre.org>",to:a,subject:i.subject,html:l});if(d)return console.error("Error sending approval email:",d),m.NextResponse.json({success:!1,message:i.failedSend},{status:500});return m.NextResponse.json({success:!0,message:"Approval email sent successfully."},{status:200})}catch(e){return console.error("notify-user error:",e),m.NextResponse.json({success:!1,message:e instanceof Error&&e.message||"Unable to send approval email."},{status:500})}}e.s(["POST",()=>R,"dynamic",0,"force-dynamic","runtime",0,"nodejs"],61935);var w=e.i(61935);let E=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/notify-user/route",pathname:"/api/notify-user",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/src/app/api/notify-user/route.ts",nextConfigOutput:"",userland:w}),{workAsyncStorage:A,workUnitAsyncStorage:C,serverHooks:P}=E;function k(){return(0,a.patchFetch)({workAsyncStorage:A,workUnitAsyncStorage:C})}async function S(e,t,a){E.isDev&&(0,n.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let m="/api/notify-user/route";m=m.replace(/\/index$/,"")||"/";let v=await E.prepare(e,t,{srcPage:m,multiZoneDraftMode:!1});if(!v)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:y,params:R,nextConfig:w,parsedUrl:A,isDraftMode:C,prerenderManifest:P,routerServerContext:k,isOnDemandRevalidate:S,revalidateOnlyGenerated:N,resolvedPathname:j,clientReferenceManifest:T,serverActionsManifest:_}=v,q=(0,i.normalizeAppPath)(m),$=!!(P.dynamicRoutes[q]||P.routes[j]),H=async()=>((null==k?void 0:k.render404)?await k.render404(e,t,A,!1):t.end("This page could not be found"),null);if($&&!C){let e=!!P.routes[j],t=P.dynamicRoutes[q];if(t&&!1===t.fallback&&!e){if(w.experimental.adapterPath)return await H();throw new h.NoFallbackError}}let O=null;!$||E.isDev||C||(O="/index"===(O=j)?"/":O);let I=!0===E.isDev||!$,M=$&&!I;_&&T&&(0,s.setManifestsSingleton)({page:m,clientReferenceManifest:T,serverActionsManifest:_});let L=e.method||"GET",U=(0,o.getTracer)(),D=U.getActiveScopeSpan(),z={params:R,prerenderManifest:P,renderOpts:{experimental:{authInterrupts:!!w.experimental.authInterrupts},cacheComponents:!!w.cacheComponents,supportsDynamicResponse:I,incrementalCache:(0,n.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:w.cacheLife,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a,n)=>E.onRequestError(e,t,a,n,k)},sharedContext:{buildId:y}},F=new l.NodeNextRequest(e),B=new l.NodeNextResponse(t),K=d.NextRequestAdapter.fromNodeNextRequest(F,(0,d.signalFromNodeResponse)(t));try{let s=async e=>E.handle(K,z).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=U.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==p.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let a=r.get("next.route");if(a){let t=`${L} ${a}`;e.setAttributes({"next.route":a,"http.route":a,"next.span_name":t}),e.updateName(t)}else e.updateName(`${L} ${m}`)}),i=!!(0,n.getRequestMeta)(e,"minimalMode"),l=async n=>{var o,l;let d=async({previousCacheEntry:r})=>{try{if(!i&&S&&N&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let o=await s(n);e.fetchMetrics=z.renderOpts.fetchMetrics;let l=z.renderOpts.pendingWaitUntil;l&&a.waitUntil&&(a.waitUntil(l),l=void 0);let d=z.renderOpts.collectedTags;if(!$)return await (0,u.sendResponse)(F,B,o,z.renderOpts.pendingWaitUntil),null;{let e=await o.blob(),t=(0,g.toNodeOutgoingHttpHeaders)(o.headers);d&&(t[f.NEXT_CACHE_TAGS_HEADER]=d),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==z.renderOpts.collectedRevalidate&&!(z.renderOpts.collectedRevalidate>=f.INFINITE_CACHE)&&z.renderOpts.collectedRevalidate,a=void 0===z.renderOpts.collectedExpire||z.renderOpts.collectedExpire>=f.INFINITE_CACHE?void 0:z.renderOpts.collectedExpire;return{value:{kind:b.CachedRouteKind.APP_ROUTE,status:o.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){throw(null==r?void 0:r.isStale)&&await E.onRequestError(e,t,{routerKind:"App Router",routePath:m,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:M,isOnDemandRevalidate:S})},!1,k),t}},p=await E.handleResponse({req:e,nextConfig:w,cacheKey:O,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:P,isRoutePPREnabled:!1,isOnDemandRevalidate:S,revalidateOnlyGenerated:N,responseGenerator:d,waitUntil:a.waitUntil,isMinimalMode:i});if(!$)return null;if((null==p||null==(o=p.value)?void 0:o.kind)!==b.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==p||null==(l=p.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});i||t.setHeader("x-nextjs-cache",S?"REVALIDATED":p.isMiss?"MISS":p.isStale?"STALE":"HIT"),C&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let h=(0,g.fromNodeOutgoingHttpHeaders)(p.value.headers);return i&&$||h.delete(f.NEXT_CACHE_TAGS_HEADER),!p.cacheControl||t.getHeader("Cache-Control")||h.get("Cache-Control")||h.set("Cache-Control",(0,x.getCacheControlHeader)(p.cacheControl)),await (0,u.sendResponse)(F,B,new Response(p.value.body,{headers:h,status:p.value.status||200})),null};D?await l(D):await U.withPropagatedContext(e.headers,()=>U.trace(p.BaseServerSpan.handleRequest,{spanName:`${L} ${m}`,kind:o.SpanKind.SERVER,attributes:{"http.method":L,"http.target":e.url}},l))}catch(t){if(t instanceof h.NoFallbackError||await E.onRequestError(e,t,{routerKind:"App Router",routePath:q,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:M,isOnDemandRevalidate:S})},!1,k),$)throw t;return await (0,u.sendResponse)(F,B,new Response(null,{status:500})),null}}e.s(["handler",()=>S,"patchFetch",()=>k,"routeModule",()=>E,"serverHooks",()=>P,"workAsyncStorage",()=>A,"workUnitAsyncStorage",()=>C],89523)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__5a02886d._.js.map