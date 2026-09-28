from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import datetime
from app.database import get_db
from app.models.user import User
from app.models.notification import Notification
from app.utils.security import require_current_user

router = APIRouter(prefix="/notifications", tags=["Smart Notifications"])

@router.get("")
def get_notifications(current_user: User = Depends(require_current_user), db: Session = Depends(get_db)):
    notifs = db.query(Notification).filter(Notification.user_id == current_user.id).order_by(Notification.created_at.desc()).all()
    if not notifs:
        # Seed realistic contextual notifications for demonstration
        seeds = [
            Notification(
                user_id=current_user.id,
                title="Scholarship Deadline Approaching",
                message="Post-Matric Scholarship application window closes in 24 days. Complete your institution verification soon.",
                notification_type="DEADLINE",
                action_url="/applications"
            ),
            Notification(
                user_id=current_user.id,
                title="Missing Document Alert",
                message="You have not uploaded an Income Certificate for this fiscal year. Schemes requiring income verification may need this.",
                notification_type="MISSING_DOC",
                action_url="/documents"
            ),
            Notification(
                user_id=current_user.id,
                title="Potential Benefit Unlocked",
                message="Based on your student status in Tamil Nadu, Naan Mudhalvan free tech certification is available.",
                notification_type="BENEFIT_ALERT",
                action_url="/benefit-gap"
            )
        ]
        for s in seeds:
            db.add(s)
        db.commit()
        notifs = seeds

    return [
        {
            "id": n.id,
            "title": n.title,
            "message": n.message,
            "notification_type": n.notification_type,
            "is_read": n.is_read,
            "action_url": n.action_url,
            "created_at": n.created_at.isoformat() if n.created_at else "2026-09-25T08:00:00"
        }
        for n in notifs
    ]

@router.put("/{id}/read")
def mark_read(id: int, current_user: User = Depends(require_current_user), db: Session = Depends(get_db)):
    notif = db.query(Notification).filter(Notification.id == id, Notification.user_id == current_user.id).first()
    if notif:
        notif.is_read = True
        db.commit()
    return {"success": True}
