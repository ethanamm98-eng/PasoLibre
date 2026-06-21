module.exports=[18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},56255,e=>{"use strict";var t=e.i(47909),r=e.i(74017),n=e.i(96250),a=e.i(59756),o=e.i(61916),i=e.i(74677),s=e.i(69741),l=e.i(16795),d=e.i(87718),p=e.i(95169),c=e.i(47587),u=e.i(66012),g=e.i(70101),f=e.i(26937),m=e.i(10372),x=e.i(93695);e.i(52474);var h=e.i(5232),b=e.i(89171),v=e.i(46245);let R=e=>String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");async function y(e){try{let t=(()=>{let e=process.env.RESEND_API_KEY;if(!e)throw Error("Missing RESEND_API_KEY.");return new v.Resend(e)})(),r=await e.json(),n=String(r.pendingSignupId||"").trim(),a=String(r.email||"").trim().toLowerCase(),o=String(r.firstName||"").trim(),i=String(r.lastName||"").trim(),s=String(r.username||"").trim(),l=r.phone?String(r.phone).trim():"",d=String(r.languagePreference||"en").trim().toLowerCase(),p="es"===d,c={missingFields:p?"Faltan campos requeridos.":"Missing required fields.",missingResendKey:p?"Falta RESEND_API_KEY.":"Missing RESEND_API_KEY.",banner:p?"Nueva solicitud de creación de cuenta":"New Account Sign-Up Request",title:p?"¡Una nueva persona quiere unirse!":"A new member wants to join!",intro:p?"Una persona ha enviado una solicitud para crear una cuenta de Paso Libre. Revisa su información a continuación y aprueba o da seguimiento según sea necesario.":"A user has submitted a request to create a new Paso Libre account. Review their information below and approve or follow up as needed.",firstName:p?"Nombre":"First Name",lastName:p?"Apellido":"Last Name",username:p?"Nombre de usuario":"Username",email:p?"Correo electrónico":"Email",phone:p?"Teléfono":"Phone",notProvided:p?"No provisto":"Not provided",pendingSignupId:p?"ID de solicitud pendiente":"Pending Signup ID",reviewButton:p?"Revisar solicitud":"Review Request",footer:p?"Este mensaje fue generado automáticamente desde Paso Libre.":"This message was generated automatically from Paso Libre.",rights:p?"Todos los derechos reservados.":"All rights reserved.",subject:p?`Nueva persona pendiente de aprobaci\xf3n: ${o} ${i}`:`New User Pending Approval: ${o} ${i}`,failedSend:p?"No se pudo enviar la notificación al administrador.":"Failed to send admin notification.",unableSend:p?"No se pudo enviar la notificación al administrador.":"Unable to send admin notification."};if(!n||!a||!o||!i||!s)return b.NextResponse.json({success:!1,message:c.missingFields},{status:400});let u=`
      <div style="margin:0;padding:0;background-color:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f3f4f6;">
          <tr>
            <td align="center" style="padding:40px 20px;">
              <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.08);">
                <tr>
                  <td style="padding:30px 40px;text-align:center;background:linear-gradient(90deg,#3b82f6,#1d4ed8);">
                    <img src="https://wusbcaffjonhexqrabzk.supabase.co/storage/v1/object/public/email-assets/logo-title_nobg.png" alt="Paso Libre" width="320" style="display:block;margin:0 auto;height:auto;">
                    <p style="margin:6px 0 0;font-size:12px;color:#dbeafe;">
                      ${c.banner}
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:32px 40px;">
                    <h2 style="margin:0 0 12px;font-size:20px;font-weight:700;color:#111827;">
                      ${c.title}
                    </h2>

                    <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#4b5563;">
                      ${c.intro}
                    </p>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f9fafb;border-radius:12px;padding:16px;">
                      <tr>
                        <td style="padding:6px 0;font-size:13px;color:#374151;">
                          <strong>${c.firstName}:</strong> ${R(o)}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:13px;color:#374151;">
                          <strong>${c.lastName}:</strong> ${R(i)}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:13px;color:#374151;">
                          <strong>${c.username}:</strong> ${R(s)}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:13px;color:#374151;">
                          <strong>${c.email}:</strong> ${R(a)}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:13px;color:#374151;">
                          <strong>${c.phone}:</strong> ${R(l||c.notProvided)}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:13px;color:#374151;">
                          <strong>${c.pendingSignupId}:</strong> ${R(n)}
                        </td>
                      </tr>
                    </table>

                    <div style="text-align:center;margin-top:28px;">
                      <a href="http://localhost:3000/account-manager" target="_blank"
                        style="display:inline-block;padding:14px 36px;background:linear-gradient(90deg,#3b82f6,#1d4ed8);color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;border-radius:10px;">
                        ${c.reviewButton}
                      </a>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="padding:24px 40px;text-align:center;background-color:#f3f4f6;border-top:1px solid #e5e7eb;">
                    <p style="margin:0;font-size:11px;color:#6b7280;">
                      ${c.footer}
                    </p>
                    <p style="margin:6px 0 0;font-size:11px;color:#6b7280;">
                      \xa9 ${new Date().getFullYear()} Paso Libre. ${c.rights}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    `,{error:g}=await t.emails.send({from:process.env.EMAIL_FROM||"Paso Libre <team@pasolibre.org>",to:process.env.ADMIN_APPROVAL_EMAIL||"ethan.a.mm98@gmail.com",subject:c.subject,html:u});if(g)throw Error(g.message||c.failedSend);return b.NextResponse.json({success:!0},{status:200})}catch(e){return console.error("notify-admin error:",e),b.NextResponse.json({success:!1,message:e instanceof Error&&e.message||"Unable to send admin notification."},{status:500})}}e.s(["POST",()=>y,"dynamic",0,"force-dynamic","runtime",0,"nodejs"],13423);var w=e.i(13423);let E=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/notify-admin/route",pathname:"/api/notify-admin",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/src/app/api/notify-admin/route.ts",nextConfigOutput:"",userland:w}),{workAsyncStorage:A,workUnitAsyncStorage:N,serverHooks:P}=E;function S(){return(0,n.patchFetch)({workAsyncStorage:A,workUnitAsyncStorage:N})}async function C(e,t,n){E.isDev&&(0,a.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let b="/api/notify-admin/route";b=b.replace(/\/index$/,"")||"/";let v=await E.prepare(e,t,{srcPage:b,multiZoneDraftMode:!1});if(!v)return t.statusCode=400,t.end("Bad Request"),null==n.waitUntil||n.waitUntil.call(n,Promise.resolve()),null;let{buildId:R,params:y,nextConfig:w,parsedUrl:A,isDraftMode:N,prerenderManifest:P,routerServerContext:S,isOnDemandRevalidate:C,revalidateOnlyGenerated:k,resolvedPathname:_,clientReferenceManifest:$,serverActionsManifest:j}=v,q=(0,s.normalizeAppPath)(b),I=!!(P.dynamicRoutes[q]||P.routes[_]),T=async()=>((null==S?void 0:S.render404)?await S.render404(e,t,A,!1):t.end("This page could not be found"),null);if(I&&!N){let e=!!P.routes[_],t=P.dynamicRoutes[q];if(t&&!1===t.fallback&&!e){if(w.experimental.adapterPath)return await T();throw new x.NoFallbackError}}let O=null;!I||E.isDev||N||(O="/index"===(O=_)?"/":O);let U=!0===E.isDev||!I,D=I&&!U;j&&$&&(0,i.setManifestsSingleton)({page:b,clientReferenceManifest:$,serverActionsManifest:j});let M=e.method||"GET",H=(0,o.getTracer)(),L=H.getActiveScopeSpan(),F={params:y,prerenderManifest:P,renderOpts:{experimental:{authInterrupts:!!w.experimental.authInterrupts},cacheComponents:!!w.cacheComponents,supportsDynamicResponse:U,incrementalCache:(0,a.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:w.cacheLife,waitUntil:n.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,n,a)=>E.onRequestError(e,t,n,a,S)},sharedContext:{buildId:R}},z=new l.NodeNextRequest(e),K=new l.NodeNextResponse(t),B=d.NextRequestAdapter.fromNodeNextRequest(z,(0,d.signalFromNodeResponse)(t));try{let i=async e=>E.handle(B,F).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=H.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==p.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let n=r.get("next.route");if(n){let t=`${M} ${n}`;e.setAttributes({"next.route":n,"http.route":n,"next.span_name":t}),e.updateName(t)}else e.updateName(`${M} ${b}`)}),s=!!(0,a.getRequestMeta)(e,"minimalMode"),l=async a=>{var o,l;let d=async({previousCacheEntry:r})=>{try{if(!s&&C&&k&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let o=await i(a);e.fetchMetrics=F.renderOpts.fetchMetrics;let l=F.renderOpts.pendingWaitUntil;l&&n.waitUntil&&(n.waitUntil(l),l=void 0);let d=F.renderOpts.collectedTags;if(!I)return await (0,u.sendResponse)(z,K,o,F.renderOpts.pendingWaitUntil),null;{let e=await o.blob(),t=(0,g.toNodeOutgoingHttpHeaders)(o.headers);d&&(t[m.NEXT_CACHE_TAGS_HEADER]=d),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==F.renderOpts.collectedRevalidate&&!(F.renderOpts.collectedRevalidate>=m.INFINITE_CACHE)&&F.renderOpts.collectedRevalidate,n=void 0===F.renderOpts.collectedExpire||F.renderOpts.collectedExpire>=m.INFINITE_CACHE?void 0:F.renderOpts.collectedExpire;return{value:{kind:h.CachedRouteKind.APP_ROUTE,status:o.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:n}}}}catch(t){throw(null==r?void 0:r.isStale)&&await E.onRequestError(e,t,{routerKind:"App Router",routePath:b,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:D,isOnDemandRevalidate:C})},!1,S),t}},p=await E.handleResponse({req:e,nextConfig:w,cacheKey:O,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:P,isRoutePPREnabled:!1,isOnDemandRevalidate:C,revalidateOnlyGenerated:k,responseGenerator:d,waitUntil:n.waitUntil,isMinimalMode:s});if(!I)return null;if((null==p||null==(o=p.value)?void 0:o.kind)!==h.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==p||null==(l=p.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});s||t.setHeader("x-nextjs-cache",C?"REVALIDATED":p.isMiss?"MISS":p.isStale?"STALE":"HIT"),N&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let x=(0,g.fromNodeOutgoingHttpHeaders)(p.value.headers);return s&&I||x.delete(m.NEXT_CACHE_TAGS_HEADER),!p.cacheControl||t.getHeader("Cache-Control")||x.get("Cache-Control")||x.set("Cache-Control",(0,f.getCacheControlHeader)(p.cacheControl)),await (0,u.sendResponse)(z,K,new Response(p.value.body,{headers:x,status:p.value.status||200})),null};L?await l(L):await H.withPropagatedContext(e.headers,()=>H.trace(p.BaseServerSpan.handleRequest,{spanName:`${M} ${b}`,kind:o.SpanKind.SERVER,attributes:{"http.method":M,"http.target":e.url}},l))}catch(t){if(t instanceof x.NoFallbackError||await E.onRequestError(e,t,{routerKind:"App Router",routePath:q,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:D,isOnDemandRevalidate:C})},!1,S),I)throw t;return await (0,u.sendResponse)(z,K,new Response(null,{status:500})),null}}e.s(["handler",()=>C,"patchFetch",()=>S,"routeModule",()=>E,"serverHooks",()=>P,"workAsyncStorage",()=>A,"workUnitAsyncStorage",()=>N],56255)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__6599a4c9._.js.map