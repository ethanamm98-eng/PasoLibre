module.exports=[18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},57192,e=>{"use strict";var t=e.i(47909),r=e.i(74017),n=e.i(96250),a=e.i(59756),s=e.i(61916),i=e.i(74677),o=e.i(69741),l=e.i(16795),d=e.i(87718),p=e.i(95169),u=e.i(47587),c=e.i(66012),g=e.i(70101),f=e.i(26937),x=e.i(10372),h=e.i(93695);e.i(52474);var m=e.i(5232),b=e.i(89171),y=e.i(24389),R=e.i(46245);let w=e=>String(e||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");async function v({email:e,firstName:t,reason:r}){let n=(()=>{let e=process.env.RESEND_API_KEY;if(!e)throw Error("Missing RESEND_API_KEY.");return new R.Resend(e)})(),a=`
    <div style="margin:0;padding:0;background-color:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f3f4f6;">
        <tr>
          <td align="center" style="padding:40px 20px;">
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,.08);">
              <tr>
                <td style="padding:30px 40px;text-align:center;background:linear-gradient(90deg,#3b82f6,#1d4ed8);">
                  <img src="https://wusbcaffjonhexqrabzk.supabase.co/storage/v1/object/public/email-assets/logo-title_nobg.png" alt="Paso Libre" width="320" style="display:block;margin:0 auto;height:auto;">
                  <p style="margin:10px 0 0;font-size:12px;color:#dbeafe;">Account Request Update</p>
                </td>
              </tr>

              <tr>
                <td style="padding:32px 40px;">
                  <h2 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#111827;">
                    Account request not approved
                  </h2>

                  <p style="margin:0 0 18px;font-size:14px;line-height:1.6;color:#4b5563;">
                    Hi ${w(t)},
                  </p>

                  <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#4b5563;">
                    Thank you for your interest in joining <strong>Paso Libre</strong>.
                    After reviewing your request, we’re unable to approve the account at this time.
                  </p>

                  ${r?`<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f9fafb;border-radius:12px;padding:16px;margin-bottom:24px;">
                          <tr>
                            <td style="padding:6px 0;font-size:13px;color:#374151;">
                              <strong>Reason:</strong> ${w(r)}
                            </td>
                          </tr>
                        </table>`:""}

                  <p style="margin:0 0 26px;font-size:14px;line-height:1.6;color:#4b5563;">
                    If you believe this was a mistake or would like to follow up, you can contact us.
                  </p>

                  <div style="text-align:center;">
                    <a href="http://localhost:3000/contact" target="_blank"
                      style="display:inline-block;padding:14px 40px;background:linear-gradient(90deg,#3b82f6,#1d4ed8);color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;border-radius:10px;">
                      Contact Paso Libre
                    </a>
                  </div>
                </td>
              </tr>

              <tr>
                <td style="padding:24px 40px;text-align:center;background:#f3f4f6;border-top:1px solid #e5e7eb;">
                  <p style="margin:0;font-size:11px;color:#6b7280;">
                    This message was generated automatically from Paso Libre.
                  </p>
                  <p style="margin:6px 0 0;font-size:11px;color:#6b7280;">
                    \xa9 ${new Date().getFullYear()} Paso Libre. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `,{error:s}=await n.emails.send({from:process.env.EMAIL_FROM||"Paso Libre <team@pasolibre.org>",to:e,subject:"Your Paso Libre Account Request",html:a});if(s)throw Error(s.message||"Failed to send denial email.")}async function E(e){try{let t=(()=>{let e=process.env.SUPABASE_SERVICE_ROLE_KEY;if(!e)throw Error("Missing SUPABASE_SERVICE_ROLE_KEY.");return(0,y.createClient)("https://wusbcaffjonhexqrabzk.supabase.co",e,{auth:{autoRefreshToken:!1,persistSession:!1}})})(),r=await e.json(),n=String(r.pendingSignupId||"").trim(),a=String(r.reason||"").trim();if(!n)return b.NextResponse.json({success:!1,message:"Missing pendingSignupId."},{status:400});let{data:s,error:i}=await t.from("pending_signups").select("*").eq("id",n).eq("status","pending").maybeSingle();if(i)throw i;if(!s)return b.NextResponse.json({success:!1,message:"Pending signup not found or already reviewed."},{status:404});let{error:o}=await t.from("pending_signups").update({status:"denied",denial_reason:a||null,reviewed_at:new Date().toISOString()}).eq("id",s.id);if(o)throw o;return await t.from("user_approval_audit").insert({pending_signup_id:s.id,action:"denied",note:a||null}),await v({email:s.email,firstName:s.first_name||"there",reason:a}),b.NextResponse.json({success:!0,message:"Signup request denied and user notified."})}catch(t){console.error("deny-user error:",t);let e=t instanceof Error?t.message:"Unable to deny signup request.";return b.NextResponse.json({success:!1,message:e},{status:500})}}e.s(["POST",()=>E,"dynamic",0,"force-dynamic","runtime",0,"nodejs"],80247);var A=e.i(80247);let _=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/admin/deny-user/route",pathname:"/api/admin/deny-user",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/src/app/api/admin/deny-user/route.ts",nextConfigOutput:"",userland:A}),{workAsyncStorage:S,workUnitAsyncStorage:C,serverHooks:k}=_;function P(){return(0,n.patchFetch)({workAsyncStorage:S,workUnitAsyncStorage:C})}async function q(e,t,n){_.isDev&&(0,a.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let b="/api/admin/deny-user/route";b=b.replace(/\/index$/,"")||"/";let y=await _.prepare(e,t,{srcPage:b,multiZoneDraftMode:!1});if(!y)return t.statusCode=400,t.end("Bad Request"),null==n.waitUntil||n.waitUntil.call(n,Promise.resolve()),null;let{buildId:R,params:w,nextConfig:v,parsedUrl:E,isDraftMode:A,prerenderManifest:S,routerServerContext:C,isOnDemandRevalidate:k,revalidateOnlyGenerated:P,resolvedPathname:q,clientReferenceManifest:N,serverActionsManifest:j}=y,T=(0,o.normalizeAppPath)(b),O=!!(S.dynamicRoutes[T]||S.routes[q]),I=async()=>((null==C?void 0:C.render404)?await C.render404(e,t,E,!1):t.end("This page could not be found"),null);if(O&&!A){let e=!!S.routes[q],t=S.dynamicRoutes[T];if(t&&!1===t.fallback&&!e){if(v.experimental.adapterPath)return await I();throw new h.NoFallbackError}}let U=null;!O||_.isDev||A||(U="/index"===(U=q)?"/":U);let H=!0===_.isDev||!O,M=O&&!H;j&&N&&(0,i.setManifestsSingleton)({page:b,clientReferenceManifest:N,serverActionsManifest:j});let D=e.method||"GET",L=(0,s.getTracer)(),$=L.getActiveScopeSpan(),z={params:w,prerenderManifest:S,renderOpts:{experimental:{authInterrupts:!!v.experimental.authInterrupts},cacheComponents:!!v.cacheComponents,supportsDynamicResponse:H,incrementalCache:(0,a.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:v.cacheLife,waitUntil:n.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,n,a)=>_.onRequestError(e,t,n,a,C)},sharedContext:{buildId:R}},F=new l.NodeNextRequest(e),K=new l.NodeNextResponse(t),B=d.NextRequestAdapter.fromNodeNextRequest(F,(0,d.signalFromNodeResponse)(t));try{let i=async e=>_.handle(B,z).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=L.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==p.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let n=r.get("next.route");if(n){let t=`${D} ${n}`;e.setAttributes({"next.route":n,"http.route":n,"next.span_name":t}),e.updateName(t)}else e.updateName(`${D} ${b}`)}),o=!!(0,a.getRequestMeta)(e,"minimalMode"),l=async a=>{var s,l;let d=async({previousCacheEntry:r})=>{try{if(!o&&k&&P&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let s=await i(a);e.fetchMetrics=z.renderOpts.fetchMetrics;let l=z.renderOpts.pendingWaitUntil;l&&n.waitUntil&&(n.waitUntil(l),l=void 0);let d=z.renderOpts.collectedTags;if(!O)return await (0,c.sendResponse)(F,K,s,z.renderOpts.pendingWaitUntil),null;{let e=await s.blob(),t=(0,g.toNodeOutgoingHttpHeaders)(s.headers);d&&(t[x.NEXT_CACHE_TAGS_HEADER]=d),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==z.renderOpts.collectedRevalidate&&!(z.renderOpts.collectedRevalidate>=x.INFINITE_CACHE)&&z.renderOpts.collectedRevalidate,n=void 0===z.renderOpts.collectedExpire||z.renderOpts.collectedExpire>=x.INFINITE_CACHE?void 0:z.renderOpts.collectedExpire;return{value:{kind:m.CachedRouteKind.APP_ROUTE,status:s.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:n}}}}catch(t){throw(null==r?void 0:r.isStale)&&await _.onRequestError(e,t,{routerKind:"App Router",routePath:b,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:M,isOnDemandRevalidate:k})},!1,C),t}},p=await _.handleResponse({req:e,nextConfig:v,cacheKey:U,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:S,isRoutePPREnabled:!1,isOnDemandRevalidate:k,revalidateOnlyGenerated:P,responseGenerator:d,waitUntil:n.waitUntil,isMinimalMode:o});if(!O)return null;if((null==p||null==(s=p.value)?void 0:s.kind)!==m.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==p||null==(l=p.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});o||t.setHeader("x-nextjs-cache",k?"REVALIDATED":p.isMiss?"MISS":p.isStale?"STALE":"HIT"),A&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let h=(0,g.fromNodeOutgoingHttpHeaders)(p.value.headers);return o&&O||h.delete(x.NEXT_CACHE_TAGS_HEADER),!p.cacheControl||t.getHeader("Cache-Control")||h.get("Cache-Control")||h.set("Cache-Control",(0,f.getCacheControlHeader)(p.cacheControl)),await (0,c.sendResponse)(F,K,new Response(p.value.body,{headers:h,status:p.value.status||200})),null};$?await l($):await L.withPropagatedContext(e.headers,()=>L.trace(p.BaseServerSpan.handleRequest,{spanName:`${D} ${b}`,kind:s.SpanKind.SERVER,attributes:{"http.method":D,"http.target":e.url}},l))}catch(t){if(t instanceof h.NoFallbackError||await _.onRequestError(e,t,{routerKind:"App Router",routePath:T,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:M,isOnDemandRevalidate:k})},!1,C),O)throw t;return await (0,c.sendResponse)(F,K,new Response(null,{status:500})),null}}e.s(["handler",()=>q,"patchFetch",()=>P,"routeModule",()=>_,"serverHooks",()=>k,"workAsyncStorage",()=>S,"workUnitAsyncStorage",()=>C],57192)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__8b4224a4._.js.map