import com.rishav.Chatty.entities.Message;
import com.rishav.Chatty.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/between")
    public ResponseEntity<List<Message>> getMessagesBetweenUsers(
            @RequestParam int user1,
            @RequestParam int user2) {
        List<Message> messages = messageService.getMessagesBetweenUsers(user1, user2);
        return ResponseEntity.ok(messages);
    }
}
